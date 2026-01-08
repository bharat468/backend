import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.MY_SENDGRID_API_KEY);

export const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.MY_SENDGRID_EMAIL,
    subject: `🎉 Welcome to Bharat Ecommerce, ${name}!`,
    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f8f9fa; padding:20px;">
      <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;border:1px solid #eee;">
        
        <h2 style="color:#1e293b;">Hey <span style="color:#3b82f6;">${name}</span> 👋</h2>
        
        <p style="font-size:16px;color:#334155;">
          Welcome to <strong>Bharat Ecommerce</strong>!  
          Your account setup is complete & you're ready to explore our amazing collection.
        </p>

        <p style="font-size:15px;color:#475569;">
          We’re thrilled to have you here!  
          Discover the best products at unbelievable prices.  
          And yes — stay tuned for exclusive offers made just for you 😍
        </p>

        <div style="text-align:center;margin:25px 0;">
          <a href="https://backend-1-unc9.onrender.com/" 
            style="background:#0f172a;color:white;padding:12px 22px;
            border-radius: 6px;font-size:15px;text-decoration:none;">
            🛍️ Start Shopping Now
          </a>
        </div>

        <p style="font-size:14px;color:#64748b;">
          If you ever need help, just reply to this email — 
          we’ll always be there for you 💬
        </p>
        
        <hr style="margin:25px 0;border:none;border-top:1px solid #e5e7eb;">

        <p style="font-size:14px;color:#475569;">
          Warm Regards,<br/>
          <strong style="color:#0f172a;">Team Bharat Ecommerce</strong><br/>
          <span style="font-size:12px;color:#94a3b8;">Your local marketplace 🤝</span>
        </p>
      </div>
    </div>
    `,
  };

  await sgMail.send(msg);
};
