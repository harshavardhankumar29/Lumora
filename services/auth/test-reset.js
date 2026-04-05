import { sql } from "./dist/utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function testReset() {
  const email = "notch2904@gmail.com";
  
  try {
    const users = await sql`SELECT user_id, password FROM users WHERE email = ${email}`;
    console.log("Before update:", users);
    
    if (users.length > 0) {
      const u = users[0];
      const newPassword = "newpassword123";
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Hashed:", hashedPassword);
      
      const updateResult = await sql`UPDATE users SET password = ${hashedPassword} WHERE user_id = ${u.user_id} RETURNING *`;
      console.log("Update result:", updateResult);
      
      const verify = await bcrypt.compare(newPassword, updateResult[0].password);
      console.log("Verify newly updated password:", verify);
      
      // now change it back to 123456
      const origHash = await bcrypt.hash("123456", 10);
      await sql`UPDATE users SET password = ${origHash} WHERE user_id = ${u.user_id}`;
      console.log("Restored original password.");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

testReset();
