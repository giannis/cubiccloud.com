<?php
$type = $_POST['type'];
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
}
else {
    return;
}

if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$emailFrom = stripslashes(strip_tags($_POST['email']));
}

if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
	$message = stripslashes(strip_tags($_POST['message']));
}

if($type == 'advertise'){
    if ((isset($_POST['phone'])) && (strlen(trim($_POST['phone'])) > 0)) {
        $phone = stripslashes(strip_tags($_POST['phone']));
    }
    else {
        return;
    }
    if ((isset($_POST['companyName'])) && (strlen(trim($_POST['companyName'])) > 0)) {
        $companyName = stripslashes(strip_tags($_POST['companyName']));
    }
    else {
        return;
    }
}
ob_start();
?>
This e-mail is from:  <?=$name;?>

with email: <?=$emailFrom;?>

<?=$name;?> wrote:

<?=$message;?>
<?
$body = ob_get_contents();

$to = 'mail@cubiccloud.com';
$email = 'mail@cubiccloud.com';
$fromname = "Online Contact";
$fromaddress = $emailFrom;
require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = $emailFrom;
$mail->FromName = $name;

$mail->WordWrap = 50;
$mail->IsHTML(true);

$mail->Subject  =  "People Contacting";
$mail->Body     =  $body;
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send()) {
    $recipient = 'mail@cubiccloud.com';
    $subject = 'People Contacting';
    $content = $body;
    mail($recipient, $subject, $content, "From: $emailFrom\r\nReply-To: $emailFrom\r\nX-Mailer: DT_formmail");
    exit;
}
?>
