<?php  ?>

<html>
    <head>
    	<title></title>
    	<script src="js/jquery-1.11.2.min.js"></script>
    </head>
    <body>

	    <script>
	    

	      function getLikes(cantidad) {

			var parametros = { "cantidad": cantidad };

			/*$.ajax({
			  url: "write.php",
			  type: "POST",
			  data: parametros

			}).done(function() {
				console.log(likes);

			});*/

            $.ajax({
              url: "write.php",
              type: "GET",
              data: "likes"

            }).done(function() {
                console.log(likes);

            });


		  };


		$(document).ready(function(){

		  	setInterval(getLikes, 10);

		});

	    </script>


	    <button onclick="getLikes(-5)">-5</button>
	    <button onclick="getLikes(5)">+5</button>

	    <h2 class="texto"></h2>

    </body>
    </html> 

	
	<?php

	/*


	/*$str = ;
	$str = str_replace('\\', '/', dirname(__FILE__)."/cacert.pem");*/

    // Defining the basic cURL function
    /*function curl($url) {
        // Assigning cURL options to an array
        $options = Array(
            CURLOPT_RETURNTRANSFER => TRUE,  // Setting cURL's option to return the webpage data
            CURLOPT_FOLLOWLOCATION => TRUE,  // Setting cURL to follow 'location' HTTP headers
            CURLOPT_AUTOREFERER => TRUE, // Automatically set the referer where following 'location' HTTP headers
            CURLOPT_CONNECTTIMEOUT => 120,   // Setting the amount of time (in seconds) before the request times out
            CURLOPT_TIMEOUT => 120,  // Setting the maximum amount of time for cURL to execute queries
            CURLOPT_MAXREDIRS => 10, // Setting the maximum number of redirections to follow
            CURLOPT_USERAGENT => "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1a2pre) Gecko/2008073000 Shredder/3.0a2pre ThunderBrowse/3.2.1.8",  // Setting the useragent
            CURLOPT_CAINFO => str_replace('\\', '/', dirname(__FILE__)."/cacert.pem"),
            CURLOPT_URL => $url, // Setting cURL's URL option with the $url variable passed into the function
        );
         
        $ch = curl_init();  // Initialising cURL 

        curl_setopt_array($ch, $options);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);   // Setting cURL's options using the previously assigned array data in $options
        $data = curl_exec($ch); // Executing the cURL request and assigning the returned data to the $data variable
         if (curl_errno($ch)) {
		    echo 'Curl error: ' . curl_error($ch);
		}

        curl_close($ch);    // Closing cURL 
        return $data;   // Returning the data from the function 
    }

     // Defining the basic scraping function
    function scrape_between($data, $start, $end){
        $data = stristr($data, $start); // Stripping all data from before $start
        $data = substr($data, strlen($start));  // Stripping $start
        $stop = stripos($data, $end);   // Getting the position of the $end of the data to scrape
        $data = substr($data, 0, $stop);    // Stripping all data from after and including the $end of the data to scrape
        return $data;   // Returning the scraped data from the function
    }
    
    $str = str_replace('\\', '/', dirname(__FILE__)."/cacert.pem");
 	echo $str;

    $scraped_page = curl("https://www.facebook.com/");    // Downloading IMDB home page to variable $scraped_page
    //$scraped_page = curl("http://gonzalobonini.com/frases/");    // Downloading IMDB home page to variable $scraped_page

    $scraped_data = scrape_between($scraped_page, "<div class=\"_50f6 _50f7 _5tfx\" data-reactid=\".1i.0.0.0\">", '</div>');   // Scraping downloaded dara in $scraped_page for content between <title> and </title> tags

    77</div>
      //<span class="number">87</span> frases, en <span class="number">22</span> autores y 3 colaboradores.</h2>

    echo $scraped_data; // Echoing $scraped data, should show "The Internet Movie Database (IMDb)"

    
	*/


	?>

