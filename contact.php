<?php
	function valid_email($str)
	{
		return ( ! preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $str)) ? FALSE : TRUE;
	}
	
	if ($_POST['name']=='' || strlen($_POST['name'])<3 || $_POST['name']=='your name..')
	{
		$errors[] = 'you forgot to write your name';
	}

	if (valid_email($_POST['e_mail'])==FALSE)
	{
		$errors[] = 'a valid email address is required';
	}
    
	if ($_POST['message']=='' || strlen($_POST['message'])<4)
	{
		$errors[] = 'you are about to send an empty message';
	}
	
	if(is_array($errors))
	{
		echo '<p class="error"><b>hey..</b></p>';
		while (list($key,$value) = each($errors))
		{
			echo '<span class="error">'.$value.'</span><br />';
		}
	}
	
	else	{
		$to = 'mail@cubiccloud.com';
		$headers = 	'From: '.$_POST['e_mail'].''. "\r\n" .
				'Reply-To: '.$_POST['e_mail'].'' . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
		$subject = "People contacting";
		$message = htmlspecialchars($_POST['message']);
		
		if(mail($to, $subject, $message, $headers))
		{
			echo 'Thank you '.$_POST['first_name'].'. Your message was sent';
		}
	}
?> 