import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.RESEND_API_KEY;

const resend = new Resend(`${key}`);

const sendEmail = async (otp, email) => {
  const { data, error } = await resend.emails.send({
    from: 'DarziXpress <darzixpress@resend.dev>',
    to: [`${email}`],
    subject: 'DarziXpress OTP Verification',
    html: `
        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;margin-left:auto;margin-right:auto;margin-top:2.5rem;margin-bottom:2.5rem;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(229,229,229);padding-left:2.5rem;padding-right:2.5rem;padding-top:1.25rem;padding-bottom:1.25rem">
  <tbody>
    <tr style="width:100%">
      <td>
        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem">
          <tbody>
            <tr>
              <td style="display:flex;align-items:center;gap:0.5rem">
                <span style="font-size:1.25rem;font-weight:600;color:#000;vertical-align:middle">DarziXpress</span>
              </td>
            </tr>
          </tbody>
        </table>
        <h1 style="margin-top:1.75rem;margin-bottom:1.75rem;padding:0px;font-size:1.25rem;line-height:1.75rem;font-weight:500;color:#000">
          Please confirm your email address
        </h1>
        <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;margin-left:auto;margin-right:auto;color:#000000;">
          Enter this code on the DarziXpress verify page to complete your sign up:
        </p>
        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem;margin-bottom:2rem;border-radius:0.5rem;border-width:1px;border-style:solid;border-color:rgb(229,229,229)">
          <tbody>
            <tr>
              <td>
                <div style="color:#000000;margin-left:auto;margin-right:auto;width:fit-content;padding:0.75rem 1.5rem;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas;font-size:1.5rem;line-height:2rem;font-weight:600;letter-spacing:0.25em">
                ${otp}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;color:#000">
          This code expires in 10 minutes.
        </p>
        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:1.5rem 0;border-width:1px;border-color:rgb(229,229,229)">
        <p style="font-size:12px;line-height:1.5rem;margin:16px 0;color:rgb(115,115,115)">
          This email was intended for 
          <span style="color:#000">
            <a href="mailto:${email}" target="_blank">${email}.</a>
          </span>
          If you were not expecting this email, you can safely ignore it or delete it.
        </p>
      </td>
    </tr>
  </tbody>
</table>
        `,
    text: `Your OTP is ${otp}`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}


async function sendOTP(email, otp) {
  console.log(`Sending OTP ${otp} to ${email}`);
  try {
    await sendEmail(otp, email);
    console.log(`OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    return false;
  }
}

export default sendOTP;