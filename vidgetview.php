<div class="ns_vidget">
    <form class="ns_vidget_form" action="" method="post">
        <div class="clean-type-wrap ">
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
        <div class="input-wrap">
                        <div class="input-num-mobile">
                            <button class="input-num__button input-num__button_min" id="square-min-btn" type="button"></button>
                            <input class="input-num__display" id="sqm-dup-mobile" type="number" value="20">
                            <button class="input-num__button input-num__button_plus" id="square-plus-btn" type="button"></button>
                        </div>
                    </div>
        <button type="submit">Заказать уборку</button>
    </form>
</div>