<?php 

		define('FACEBOOK_SDK_V4_SRC_DIR', __DIR__ . '/facebook-php-sdk-v4/src/Facebook/');
		require __DIR__ . '/facebook-php-sdk-v4/autoload.php';
		
		use Facebook\FacebookSession;
		use Facebook\FacebookRedirectLoginHelper;
		use Facebook\FacebookRequest;
		use Facebook\FacebookResponse;
		use Facebook\FacebookSDKException;
		use Facebook\FacebookRequestException;
		use Facebook\FacebookAuthorizationException;
		use Facebook\GraphObject;
		use Facebook\Entities\AccessToken;

		if (isset($_GET['likes'])) {

		   

			//Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYPEER] = false;

			$sec = '2f806563eaccdea361620cffb09b0491';
			$tok = '1618630555020765|OdzT3eO1OWHGPBdOVBshLPG0TZY';

			$proof = hash_hmac('sha256', $tok, $sec);

			FacebookSession::setDefaultApplication('1618630555020765', $sec);

			$session = new FacebookSession($tok);

			$request = new FacebookRequest($session, 'GET', '/527742504024096?fields=likes');
			$response = $request->execute();
			$obb = $response->getGraphObject()->getProperty('likes');

			echo $obb;


	
		} else {


			$sum = $_POST['cantidad'];
			$myfile = fopen("../data.txt", "r") or die("Unable to open file!");
			$prev =  fgets($myfile);
			fclose($myfile);
			$myfile = fopen("../data.txt", "w+") or die("Unable to open file!");
			$sum += intval($prev);
			fwrite($myfile, $sum);

			echo $obb;


		}
	 

 ?>