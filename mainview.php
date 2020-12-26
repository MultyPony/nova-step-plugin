<style>
    .second-step, .third-step {
        /* display: none; */
        /* visibility: hidden; */
    }
    
    .show {
        display: block;
    }

    fieldset {
        display: flex;
        flex-direction: column;
    }
    
    .form-container {
        display: flex;
    }

    .order-wrap {
        width: 300px;
        height: 500px;
        
        border: 1px solid black;
        border-radius: 20px;
    }
</style>

<div class="wrap">
    <h1>Заказать уборку в три шага</h1>
    <div class="form-container">
        <form action="" method="post">
            <div class="first-step">
                <fieldset>
                    <legend>Выберите тип уборки</legend>
                    <label>
                        Поддерживающая 
                        <input type="radio" name="clean-type" value="support" checked>
                        <p class="clean-type-price">
                            <?php $setting = get_option('novastep_setting_name'); echo $setting['support_clean'];?>
                        </p>
                    </label>
                    <label>
                        Генеральная
                        <input type="radio" name="clean-type" value="main">
                        <p class="clean-type-price">
                            <?php $setting = get_option('novastep_setting_name'); echo $setting['main_clean'];?>
                        </p>
                    </label>
                    <label>
                        Послестроительная уборка
                        <input type="radio" name="clean-type" value="build">
                        <p class="clean-type-price">
                            <?php $setting = get_option('novastep_setting_name'); echo $setting['post-construction_clean'];?>
                        </p>
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Где навести порядок?</legend>
                    <label>
                        Улица
                        <input type="text" name="street">
                    </label>
                    <label>
                        Дом
                        <input type="text" name="house" placeholder="">
                    </label>
                    <label>
                        Квартира
                        <input type="number" name="apartment-number" value="1">
                    </label>
                    <label>
                        Подьезд
                        <input type="number" name="entrance" value="1">
                    </label>
                    <label>
                        Этаж
                        <input type="number" name="floor" value="1">
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Во сколько приехать?</legend>
                    <!-- Дата  и время -->
                </fieldset>
            </div>
            <div class="second-step">
                Дополнительные услуги
                <fieldset>
                    <legend></legend>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="1">
                                Чистка вытяжки
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="2">
                                Мытье шкафов изнутри  
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="3">
                                Замена постельного белья
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="3">
                                Мытье окон
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="4">
                                Чистка микроволновой печи
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="5">
                                Мытье духового шкафа изнутри 
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="6">
                                Мытье холодильника изнутри
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="7">
                                Доставка и забор ключей
                            </label>
                            <!-- <p>110р</p> -->
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" name="services[]" value="8">
                                Уборка на балконе
                            </label>
                        </li>
                    </ul>
                </fieldset>
            </div>
            <div class="third-step">
                Расскажите о себе
                <fieldset>
                    <legend></legend>
                    <label>
                        Имя
                        <input type="text" name="ns_name">
                    </label>
                    <label>
                        Телефон
                        <input type="text" name="ns_tel">
                    </label>
                    <label>
                        Почта
                        <input type="email" name="ns_email">
                    </label>
                </fieldset>
            </div>
            <button type="submit">Заказать</button>
        </form>
        <div class="order-wrap"> 
            <p class="clean-type-heading"></p>
            <label>
                Площадь помещения, м2
                <input type="number" name="square" value="10">
            </label>
        </div>
    </div>
</div>
<script>

</script>

<?php
    $service_list = "";
    if(!empty($_POST['services'])) {
        foreach($_POST['services'] as $service) {
            // $service_list .= "- " . (empty($service) ? "PUSTO" : $service) . "\n"; //echoes the value set in the HTML form for each checked checkbox.
            $service_list .= "- " . $service . "\n"; //echoes the value set in the HTML form for each checked checkbox.
                            //so, if I were to check 1, 3, and 5 it would echo value 1, value 3, value 5.
                            //in your case, it would echo whatever $row['Report ID'] is equivalent to.
        }
    }

    if ( ! empty( $_POST['house'] ) ) {
        $message = 'Тип уборки: ' . $_POST['clean-type'] . "\n";
        $message .= "Дополнительные услуги\n";
        $message .= $service_list;
        $message .= "";
        $message .= "Адрес: ул. " . $_POST['street'] . ", д. " . $_POST['house'] ;
        $message .= ", кв. " . $_POST['apartment-number'] . "\n";
        $message .= 'Подъезд №: ' . $_POST['entrance'] . "\n";
        $message .= "Имя: " . (empty($_POST['ns_name']) ? "-" : $_POST['ns_name']) . "\n";
        $message .= "Телефон: " . (empty($_POST['ns_tel']) ? "-" : $_POST['ns_tel']) . "\n";
        $message .= "Почта: " . (empty($_POST['ns_email']) ? "-" : $_POST['ns_email']) . "\n";
        wp_mail('meshcheryakovvrn@gmail.com', 'Заказ с сайта', $message);
    }

?>