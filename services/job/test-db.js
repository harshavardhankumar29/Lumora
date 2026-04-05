import { sql } from "./src/utils/db.js";
async function main() {
    const users = await sql `SELECT user_id, email, role FROM users WHERE email = 'notch2904@gmail.com'`;
    console.log("Users:", users);
    if (users.length > 0) {
        const userId = users[0].user_id;
        const companies = await sql `SELECT * FROM companies WHERE recruiter_id = ${userId}`;
        console.log(`Companies for user ${userId}:`, companies);
        // Also, just fetch all companies to see what recruiter_ids they have
        const allCompanies = await sql `SELECT company_id, name, recruiter_id FROM companies`;
        console.log("All Companies:", allCompanies);
    }
    process.exit(0);
}
main().catch(console.error);
