<?php


    $toEmail = "volcharo@gmail.com";
    $mailHeaders = "From: admin@novomed-plastica.ru" ."\r\n";

    $subject = "Обратный звонок Пластика";
    $data = "Поступила заявка на обратный звонок с сайта plastik.novomed-novoross.ru.\n";
    $data .= "Телефон: " . $_POST['phone'] . "\n";

    if (isset($_POST['name'])) {
        $data .= "Имя: " . $_POST['name'];
    };

    if(mail($toEmail, $subject, $data, $mailHeaders)) {
        echo json_encode(array(
            "success" => true
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "error" => error_get_last()['message']
        ));
    };
?>