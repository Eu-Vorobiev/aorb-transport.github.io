<?php
	$company   	= filter_var($_POST["company"], FILTER_SANITIZE_STRING);
	$name	  		= filter_var($_POST["name"], FILTER_SANITIZE_STRING);
	$phone     	= filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
	$errors;

	$recaptcha = $_POST['g-recaptcha-response'];
 
	if(!empty($recaptcha)) {
    //Получаем HTTP от recaptcha
    $recaptcha = $_REQUEST['g-recaptcha-response'];
    //Сюда пишем СЕКРЕТНЫЙ КЛЮЧ, который нам присвоил гугл
    $secret = '6LexSVccAAAAAAwRlln7ty80-dOgcvpUN0dDMt7U';
    //Формируем utl адрес для запроса на сервер гугла
    $url = "https://www.google.com/recaptcha/api/siteverify?secret=".$secret ."&response=".$recaptcha."&remoteip=".					$_SERVER['REMOTE_ADDR'];
 
    //Инициализация и настройка запроса
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);
    curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.16) Gecko/20110319 			Firefox/3.6.16");
    //Выполняем запрос и получается ответ от сервера гугл
    $curlData = curl_exec($curl);
	 
    curl_close($curl); 
    //Ответ приходит в виде json строки, декодируем ее
    $curlData = json_decode($curlData, true);
 
    //Смотрим на результат
    if($curlData['success']) {

			if ( empty($company)) {
				$errors = "Будьте добры, введите название компании";
			} else {
				$companyName = $company;
			}

			if (empty($name)) {
				$errors = "Будьте добры, введите Ваше имя";
			} else {
				$name = $name;
			}

			if (empty($phone)) {
				$errors = "Будьте добры, введите номер телефона компании";
			} else {
				$companyPhone = $phone;
			}

			$to1 = "gorskih@aorb.ru";
			$to2 = "igorskih@gmail.com";
			$mailBody .= "Название компании: " . $companyName . "\n";
			$mailBody .= "Имя: " . $name . "\n";
			$mailBody .= "Телефон компании: " . $companyPhone . "\n";
			
			if (mail($to1, 'Вам пришла заявка с сайта AORB-Transport', $mailBody) && mail($to2, 'Вам пришла заявка с сайта AORB-Transport', $mailBody) ) {
				$output = "ok";
				die($output);
			} else {
				$output = $errors;
				die($output);
			}
    } else {
        //Капча не пройдена, сообщаем пользователю, все закрываем стираем и так далее
    }
	}
	else {
		$output = $errors;
		die($output);
	}
?>