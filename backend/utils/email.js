const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create transporter
let transporter;
if (process.env.NODE_ENV === 'test') {
  // Mock transporter for tests
  transporter = {
    sendMail: async () => ({ messageId: 'test-message-id' })
  };
} else {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} options.html - HTML body
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'Fitness App'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully', { messageId: info.messageId, to: options.to });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email sending failed', { error: error.message, to: options.to });
    throw error;
  }
};

/**
 * Send welcome email to new users
 * @param {string} email - User email
 * @param {string} name - User name
 */
const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Fitness App!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Fitness App, ${name}!</h2>
      <p>Thank you for joining our fitness community. We're excited to help you on your fitness journey!</p>
      <p>Here are some things you can do to get started:</p>
      <ul>
        <li>Complete your profile</li>
        <li>Set your fitness goals</li>
        <li>Explore workout plans</li>
        <li>Track your nutrition</li>
        <li>Connect with other fitness enthusiasts</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Happy training!</p>
      <p>The Fitness App Team</p>
    </div>
  `;

  const text = `
    Welcome to Fitness App, ${name}!

    Thank you for joining our fitness community. We're excited to help you on your fitness journey!

    Here are some things you can do to get started:
    - Complete your profile
    - Set your fitness goals
    - Explore workout plans
    - Track your nutrition
    - Connect with other fitness enthusiasts

    If you have any questions, feel free to reach out to our support team.

    Happy training!

    The Fitness App Team
  `;

  return await sendEmail({ to: email, subject, html, text });
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @param {string} resetToken - Password reset token
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

  const subject = 'Password Reset Request';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>You requested a password reset for your Fitness App account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
      <p>The Fitness App Team</p>
    </div>
  `;

  const text = `
    Password Reset Request

    You requested a password reset for your Fitness App account.

    Please visit the following link to reset your password:
    ${resetUrl}

    This link will expire in 1 hour.

    If you didn't request this password reset, please ignore this email.

    The Fitness App Team
  `;

  return await sendEmail({ to: email, subject, html, text });
};

/**
 * Send email verification
 * @param {string} email - User email
 * @param {string} verificationToken - Email verification token
 */
const sendEmailVerification = async (email, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;

  const subject = 'Verify Your Email Address';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Verify Your Email Address</h2>
      <p>Thank you for registering with Fitness App!</p>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
      <p>The Fitness App Team</p>
    </div>
  `;

  const text = `
    Verify Your Email Address

    Thank you for registering with Fitness App!

    Please visit the following link to verify your email address:
    ${verificationUrl}

    This link will expire in 24 hours.

    The Fitness App Team
  `;

  return await sendEmail({ to: email, subject, html, text });
};

/**
 * Send workout reminder email
 * @param {string} email - User email
 * @param {string} name - User name
 * @param {string} workoutName - Name of the workout
 */
const sendWorkoutReminder = async (email, name, workoutName) => {
  const subject = `Time for your workout: ${workoutName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Workout Reminder</h2>
      <p>Hi ${name},</p>
      <p>It's time for your scheduled workout: <strong>${workoutName}</strong></p>
      <p>Remember to stay hydrated and listen to your body. You've got this!</p>
      <p>Happy training!</p>
      <p>The Fitness App Team</p>
    </div>
  `;

  const text = `
    Workout Reminder

    Hi ${name},

    It's time for your scheduled workout: ${workoutName}

    Remember to stay hydrated and listen to your body. You've got this!

    Happy training!

    The Fitness App Team
  `;

  return await sendEmail({ to: email, subject, html, text });
};

/**
 * Send nutrition reminder email
 * @param {string} email - User email
 * @param {string} name - User name
 */
const sendNutritionReminder = async (email, name) => {
  const subject = 'Nutrition Check-in Time';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Nutrition Check-in</h2>
      <p>Hi ${name},</p>
      <p>Don't forget to log your meals and track your nutrition today!</p>
      <p>Maintaining a balanced diet is key to achieving your fitness goals.</p>
      <p>The Fitness App Team</p>
    </div>
  `;

  const text = `
    Nutrition Check-in

    Hi ${name},

    Don't forget to log your meals and track your nutrition today!

    Maintaining a balanced diet is key to achieving your fitness goals.

    The Fitness App Team
  `;

  return await sendEmail({ to: email, subject, html, text });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
  sendWorkoutReminder,
  sendNutritionReminder,
};