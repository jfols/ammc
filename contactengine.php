<?php

require_once 'mandrill_src/Mandrill.php';
require_once 'recaptcha/recaptchalib.php';

$mandrill = new Mandrill('x4-REEzk9BdY6JH2SDUPiw');

$EmailFrom = "sales@ammc.com";
$Subject = "You've received a new inquiry from your website";
$Name = Trim(stripslashes($_POST['Name']));
//$Tel = Trim(stripslashes($_POST['Tel']));
$Email = Trim(stripslashes($_POST['Email']));
$Message = Trim(stripslashes($_POST['Message']));

// check for spam, recaptcha
$privatekey = '6Ler0PwSAAAAAAA_ZX57-9fwvGg3FdQhzR4kQzdP';
$resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);

if (!$resp->is_valid) {
  // What happens when the CAPTCHA was entered incorrectly
  die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
       "(reCAPTCHA said: " . $resp->error . ")");
}

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

try {
    $message = array(
        'text' => $Body,
        'subject' => 'AMMC.com contact us form',
        'from_email' => 'admin@ammc.com',
        'from_name' => 'AMMC Contact',
        'to' => array(
            array(
                'email' => 'sales@ammc.com',
                'name' => 'Sales AMMC',
                'type' => 'to'
            ),
            array(
              'email' => 'support@creativefuse.org',
              'name' => 'CFi Support',
              'type' => 'to'
            )
        ),
        'headers' => array('Reply-To' => $Email),
        'important' => false,
        'track_opens' => null,
        'track_clicks' => null,
        'auto_text' => null,
        'auto_html' => null,
        'inline_css' => null,
        'url_strip_qs' => null,
        'preserve_recipients' => null,
        'view_content_link' => null,
        'bcc_address' => null,
        'tracking_domain' => null,
        'signing_domain' => null,
        'return_path_domain' => null,
        'merge' => true,
        'global_merge_vars' => array(),
        'merge_vars' => array(),
        'tags' => array('contact-us'),
        'subaccount' => null,
        'google_analytics_domains' => null,
        'google_analytics_campaign' => null,
        'metadata' => array(),
        'attachments' => array(),
        'images' => array()
    );
    $async = false;
    $result = $mandrill->messages->send($message, $async);// $ip_pool, $send_at);
    print_r($result);
  // redirect to success page
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
} catch(Mandrill_Error $e) {
    // Mandrill errors are thrown as exceptions
    error_log('A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage());
    // redirect to error page
    print "<meta http-equiv=\"refresh\" content=\"0;URL=contacterror.php\">";
}
?>
