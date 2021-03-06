<?php 
    $t_support = '';
    $t_main = '';
    $t_build = '';

    if (isset($_GET['clean-type'])) {
        // $t_support = 'checked';
        switch ($_GET['clean-type']) {
            case 'support':
                $t_support = 'checked';
                break;
            case 'main':
                $t_main = 'checked';
                break;
            case 'build':
                $t_build = 'checked';
                break;
        }
    } else {
        $t_support = 'checked';
    }

    // add_option( 'my_option', '255' );
    // add_option('wporg_dates_option', 'hello world!');

    // $arr_source = get_option('wporg_dates_option');
    // $arr_new = array('a', 'b', 'c');
    // $res = array_merge($arr_source, $arr_new);
    // update_option('wporg_dates_option', $res);
    
    // $headers[] = 'Content-type: text/html; charset=utf-8';
    // wp_mail('meshcheryakovvrn@gmail.com', 'Заказ с сайта', 'Приваепта', $headers);
    // wp_mail('meshcheryakovvrn@gmail.com', 'Заказ с сайта', 'Приваепта');
?>

<div class="wrap">
    <h1 class="ns_main-heading">
    <!-- <?php echo get_option('wporg_dates_option');?> -->
    <?php 
        $bd = get_option('wporg_dates_option');
        // $bd['07.02.2021'] = array('19:00');
        // update_option('wporg_dates_option', $bd);
    ?>
    <!-- <?php echo date("d.m.Y");?> -->
    Заказать уборку в три шага</h1>
    <div class="form-container">
        <form class="main-form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" onsubmit="event.preventDefault();">
        <!-- <form class="main-form" action="" method="post" onsubmit="event.preventDefault();"> -->
            <input type="hidden" name="action" value="nova_step_hook">
            <!-- <input type="hidden" name="custom_nonce" value="<?php echo $custom_form_nonce?>"> -->
            
            <input id="square-meters" type="hidden" name="square-meters" value="<?php echo isset($_GET['square-meters']) ? $_GET['square-meters'] : 20 ?>" data-sq-price="<?php $setting = get_option('novastep_setting_name'); echo $setting['sq_price'];?>">
            <input id="total-price" type="hidden" name="total-price">
            <div class="first-step">
                <fieldset>
                    <legend class="legend">Выберите тип уборки</legend>
                    <div class="clean-type-wrap">
                        <!-- <label class="clean-type-label clean-type-label__checked"> -->
                        <label class="clean-type-label">
                            <span class="clean-title">Поддерживающая</span> 
                            <input type="radio" name="clean-type" value="support" <?php echo $t_support ?> data-price="<?php $setting = get_option('novastep_setting_name'); echo $setting['support_clean'];?>">
                            <p class="clean-type-price">
                                <?php $setting = get_option('novastep_setting_name'); echo $setting['support_clean'];?> ₽
                            </p>
                        </label>
                        <label class="clean-type-label">
                            <span class="clean-title">Генеральная</span>
                            <input type="radio" name="clean-type" value="main" <?php echo $t_main ?> data-price="<?php $setting = get_option('novastep_setting_name'); echo $setting['main_clean'];?>">
                            <p class="clean-type-price">
                                <?php $setting = get_option('novastep_setting_name'); echo $setting['main_clean'];?> ₽
                            </p>
                        </label>
                        <label class="clean-type-label">
                            <span class="clean-title">Послестроительная уборка</span>
                            <input type="radio" name="clean-type" value="build" <?php echo $t_build ?> data-price="<?php $setting = get_option('novastep_setting_name'); echo $setting['post-construction_clean'];?>">
                            <p class="clean-type-price">
                                    <?php $setting = get_option('novastep_setting_name'); echo $setting['post-construction_clean'];?> ₽
                            </p>
                        </label>
                    </div>
                </fieldset>
                <fieldset class="mobile-square">
                    <legend class="legend">Площадь помещения, м<sup>2</sup></legend>
                    <div class="input-wrap">
                        <div class="input-num-mobile">
                            <button class="input-num__button input-num__button_min" id="square-min-btn" type="button"></button>
                            <input class="input-num__display" id="sqm-dup-mobile" type="number" value="<?php echo isset($_GET['square-meters']) ? $_GET['square-meters'] : 20 ?>">
                            <button class="input-num__button input-num__button_plus" id="square-plus-btn" type="button"></button>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend class="legend">Где навести порядок?</legend>
                    <div class="address_1">
                        <label class="street">
                            Улица
                            <input class="ns_address" id="address" name="address" type="text" />
                        </label>
                        <label class="house">
                            Дом
                            <input class="ns_house" type="text" name="house" placeholder="">
                        </label>
                    </div>
                    <div class="address_2">
                        <label class="apartment">
                            Квартира
                            <input class="ns_apartment" type="number" name="apartment-number">
                        </label>
                        <label  class="entrance">
                            Подьезд
                            <input class="entrance-input" type="number" name="entrance">
                        </label>
                        <label class="floor">
                            Этаж
                            <input class="floor-input" type="number" name="floor">
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend class="legend">Во сколько приехать?</legend>
                    <div class="date-time">
                        <label class="ns_date">
                            <!-- <input class="date-input" type="date" name="ns_date"> -->
                            <!-- <input type='text' class="date-input datepicker-here" data-position="top left" name="ns_date"/> -->
                            <input type='text' class="date-input" data-position="top left" name="ns_date" readonly/>
                        </label>
                        <label class="ns_time">
                            <select class="ns_time__input" name="ns_time" onclick="event.preventDefault(); event.stopPropagation();" onchange="event.preventDefault(); event.stopPropagation();">
                                <option data-placeholder="true"></option>
                            </select>
                        </label>
                    </div>
                </fieldset>
            </div>
            <div class="second-step hidden">
                <!-- Дополнительные услуги -->
                <fieldset>
                    <legend></legend>
                    <ul class="service-list">
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/extraction-hood.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="400" value="1">
                                <span class="service-name">Чистка вытяжки</span>
                            </label>
                            <span class="service-price">400 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/closet.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="550" value="2">
                                <span class="service-name">Мытье шкафов изнутри</span>  
                            </label>
                            <span class="service-price">550 ₽</span>
                        </li>
                        <li class="service-item">  
                            <label class="service-label">
                                <?php require_once('assets/img/bed.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="250" value="3">
                                <span class="service-name">Замена постельного белья</span>
                            </label>
                            <span class="service-price">250 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/window.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="110" value="4">
                                <span class="service-name">Мытье окон</span>
                            </label>
                            <span class="service-price">110 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/microwave.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="300" value="5">
                                <span class="service-name">Чистка микроволновой печи</span>
                            </label>
                            <span class="service-price">300 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/gas-stove.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="450" value="6">
                                <span class="service-name">Мытье духового шкафа изнутри</span> 
                            </label>
                            <span class="service-price">450 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/fridge.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="500" value="7">
                                <span class="service-name">Мытье холодильника изнутри</span>
                            </label>
                            <span class="service-price">500 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/key.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="300" value="8">
                                <span class="service-name">Доставка и забор ключей</span>
                            </label>
                            <span class="service-price">300 ₽</span>
                        </li>
                        <li class="service-item">
                            <label class="service-label">
                                <?php require_once('assets/img/balcony.svg'); ?>
                                <input class="service-checkbox" type="checkbox" name="services[]" data-service-price="750" value="9">
                                <span class="service-name">Уборка на балконе</span>
                            </label>
                            <span class="service-price">750 ₽</span>
                        </li>
                    </ul>
                </fieldset>
            </div>
            <div class="third-step hidden">
                <!-- Расскажите о себе -->
                <fieldset>
                    <legend></legend>
                    <label>
                        Имя
                        <input id="fullname" class="ns_name" type="text" name="ns_name">
                    </label>
                    <label>
                        Телефон
                        <input class="ns_tel" type="text" name="ns_tel" value="<?php echo isset($_GET['ns_tel']) ? $_GET['ns_tel'] : '' ?>">
                    </label>
                    <label>
                        Почта
                        <input class="ns_email" type="email" name="ns_email">
                    </label>
                </fieldset>
            </div>
            <button type="submit" hidden>Заказать</button>
        </form>
        <div class="order-wrap">
            <div class="num-wrap">
                <div class="num-wrap__item num-wrap__item_active">
                    <span class="num-wrap__num">1</span>
                    Основное
                </div>
                <div class="num-wrap__item">
                    <span class="num-wrap__num">2</span>
                    Доп. услуги
                </div>
                <div class="num-wrap__item">
                    <span class="num-wrap__num">3</span>
                    Оплата
                </div>
                <hr class="num-wrap__hr num-wrap__hr_left">
                <hr class="num-wrap__hr num-wrap__hr_right">
            </div>
            <p class="order-type-title">Тип уборки</p>
            <p class="order-type">Поддерживающая</p>
            <p class="order-address-title">Адрес:</p>
            <p class="order-address"></p>
            <p class="order-date-title">Дата и время:</p>
            <p class="order-date"></p>
            <p class="order-square-title">Площадь помещения, м<sup>2</sup></p>
            <div class="input-num">
                <button class="input-num__button input-num__button_min" id="square-min-btn" type="button"></button>
                <input class="input-num__display" id="sqm-dup" type="number" value="<?php echo isset($_GET['square-meters']) ? $_GET['square-meters'] : 20 ?>">
                <button class="input-num__button input-num__button_plus" id="square-plus-btn" type="button"></button>
            </div>
            <p class="order-service-title">Доп. услуги:</p>
            <ul class="order-service"></ul>
            <p class="order-price-title">Стоимость уборки:</p>
            <p class="order-price"></p>
            <div class="button-wrap">
                <button class="prev-btn hidden" type="button">Назад</button>
                <button class="next-btn" type="button">Далее</button>
            </div>
        </div>
    </div>
    <div class="order-bottom">
        <button class="prev-btn hidden" type="button">Назад</button>
        <button class="next-btn" type="button">Далее</button>
        <p class="order-price"></p>
    </div>








    <!-- <div class="ns_vidget">
        <form class="ns_vidget_form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post">
            <input type="hidden" name="action" value="nova_step_vidget_hook">
            <div class="ns_row ns_row-1">
                <div class="ns_sq-wrap">
                    <p class="ns_sq-title">Площадь помещения, м<sup>2</sup></p>
                    <div class="ns_input-num">
                        <button class="ns_sq-btn ns_sq-btn-min" id="square-min-btn" type="button"></button>
                        <input class="ns_sq-input input-num__display" id="sqm-dup" type="number" value="<?php echo $_GET['square-meters'] ?>">
                        <button class="ns_sq-btn ns_sq-btn-plus" id="square-plus-btn" type="button"></button>
                    </div>
                </div>

                <div class="clean-type-wrap ns_clean-type-wrap">
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
                </div>
            </div>
            <div class="ns_row ns_row-2">
                <label class="ns_tel-label">
                    Введите номер:
                    <input class="ns_tel-input" type="text" name="ns_tel">
                </label>
                <button class="ns_submit-btn" type="submit">Заказать уборку</button>
            </div>       
        </form>
    </div> -->







</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/suggestions-jquery@20.3.0/dist/css/suggestions.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/suggestions-jquery@20.3.0/dist/js/jquery.suggestions.min.js"></script>

<script>
    $("#address").suggestions({
        token: "31eaf903a7b8a04154ad9ddb5e7376667580fd3a",
        type: "ADDRESS",
        bounds: "street",
        constraints: {
            // ограничиваем поиск по Томску
            "locations": [{
            "kladr_id": "70"
            }],
        },
        onSelect: function(suggestion) {
            console.log(suggestion);
        }
    });

    $("#fullname").suggestions({
        token: "31eaf903a7b8a04154ad9ddb5e7376667580fd3a",
        type: "NAME",
        /* Вызывается, когда пользователь выбирает одну из подсказок */
        onSelect: function(suggestion) {
            console.log(suggestion);
        }
    });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/slim-select/1.26.2/slimselect.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/slim-select/1.26.2/slimselect.min.css" rel="stylesheet"></link>

<script>
    window.slim = new SlimSelect({
        select: '.ns_time__input',
        data: [
            {'placeholder': true, 'text': '00:00'},
            {text: '9:00'},
            {text: '10:00'},
            {text: '11:00'},
            {text: '12:00'},
            {text: '13:00'},
            {text: '14:00'},
            {text: '15:00'},
            {text: '16:00'},
            {text: '17:00'},
            {text: '18:00'},
            {text: '19:00'},
            {text: '20:00'},
            {text: '21:00'},           
        ],
        showContent: 'up',
        showSearch: false,
        // addToBody: true,
    });
    window.slim.disable();
</script>

<script>
    window.ajaxURL = '<?php echo admin_url('admin-ajax.php') ?>';
    window.blockedTimeAndDates = JSON.parse('<?php echo json_encode(get_option('wporg_dates_option')); ?>');
</script>