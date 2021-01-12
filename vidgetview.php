<div class="ns_vidget">
        <form class="ns_vidget_form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" onsubmit="event.preventDefault();">
            <input type="hidden" name="action" value="nova_step_vidget_hook">
            <div class="ns_row ns_row-1">
                <div class="ns_sq-wrap">
                    <p class="ns_sq-title">Площадь помещения, м<sup>2</sup></p>
                    <div class="ns_input-num">
                        <button class="ns_sq-btn ns_sq-btn-min" id="square-min-btn" type="button"></button>
                        <input class="ns_sq-input input-num__display" id="sqm-dup" type="number" value="20" name="square-meters">
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
    </div>