<div class="wrap">
    <h1>Заказать уборку в три шага</h1>
    <div class="form-container">
        <form action="" method="post">
            <div class="first-step">
                <fieldset>
                    <legend class="legend">Выберите тип уборки</legend>
                    <div class="clean-type-wrap">
                        <label class="clean-type-label clean-type-label__checked">
                            Поддерживающая 
                            <input type="radio" name="clean-type" value="support" checked>
                            <p class="clean-type-price">
                                <?php $setting = get_option('novastep_setting_name'); echo $setting['support_clean'];?> ₽
                            </p>
                        </label>
                        <label class="clean-type-label">
                            Генеральная
                            <input type="radio" name="clean-type" value="main">
                            <p class="clean-type-price">
                                <?php $setting = get_option('novastep_setting_name'); echo $setting['main_clean'];?> ₽
                            </p>
                        </label>
                        <label class="clean-type-label">
                            Послестроительная уборка
                            <input type="radio" name="clean-type" value="build">
                            <p class="clean-type-price">
                                    <?php $setting = get_option('novastep_setting_name'); echo $setting['post-construction_clean'];?> ₽
                            </p>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend class="legend">Где навести порядок?</legend>
                    <label>
                        Улица
                        <input id="address" name="address" type="text" />
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
                    <legend class="legend">Во сколько приехать?</legend>
                    <!-- Дата  и время -->
                    <input type="date" required>
                    <input type="time" min="09:00" max="18:00" step="1800" required>
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
            <p class="clean-type-heading-order">Тип уборки</p>
            <p>Адрес:</p>
            <p>-</p>
            <p>Дата и время:</p>
            <p>-</p>
            <label>
                Площадь помещения, м2
                <input type="number" name="square" value="10">
            </label>
            <p>Доп. услуги:</p>
            <p>-</p>
            <p>Стоимость уборки:</p>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/suggestions-jquery@20.3.0/dist/css/suggestions.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/suggestions-jquery@20.3.0/dist/js/jquery.suggestions.min.js"></script>

<script>
    $("#address").suggestions({
        token: "31eaf903a7b8a04154ad9ddb5e7376667580fd3a",
        type: "ADDRESS",
        constraints: {
            // ограничиваем поиск Москвой
            "locations": [{
            "kladr_id": "70"
            }]
        },
        // в списке подсказок не показываем область
        // restrict_value: true
        /* Вызывается, когда пользователь выбирает одну из подсказок */
        onSelect: function(suggestion) {
            console.log(suggestion);
        }
    });
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