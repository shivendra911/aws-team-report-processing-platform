const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const pool = require('../db');
require('dotenv').config();

// 1. Initialize the S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const getPresignedUrl = async (req, res) => {
    try {
        const { teamId, employeeId, fileName, contentType } = req.body;

        // Ensure we have all the required data
        if (!teamId || !employeeId || !fileName || !contentType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // 2. Build the exact S3 Path (the "Key") required by the assignment
        // Example: team-1/pending/my-report.pdf
        const s3Key = `team-${teamId}/pending/${Date.now()}-${fileName}`;

        // 3. Create the AWS Command
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Key,
            ContentType: contentType 
        });

        // 4. Generate the VIP Ticket (expires in 1 hour)
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        // 5. Save the metadata to our PostgreSQL database
        const newReport = await pool.query(
            `INSERT INTO reports (team_id, uploaded_by, file_name, s3_key, status, uploaded_at) 
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
            [teamId, employeeId, fileName, s3Key, 'pending']
        );

        // Send both the URL and the database record back to the user
        res.status(200).json({
            message: "Presigned URL generated successfully!",
            uploadUrl: presignedUrl,
            reportRecord: newReport.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate presigned URL" });
    }
};

module.exports = {
    getPresignedUrl
};