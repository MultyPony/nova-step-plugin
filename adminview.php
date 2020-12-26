<?php
    $setting = get_option('clean-type');
?>

<div class="wrap">
    <h1>Nova Step</h1>

    <form action="options.php" method="post">
        <!-- <label>
            Вид уборки
            <input type="text" value="">
        </label>
        <label>
            Цена
            <input type="number">
        </label> -->
        <?php

        settings_fields( 'novastep' );

        do_settings_sections( 'novastep' );

        submit_button( __('Сохранить', 'nova_step'))
        ?>
        <!-- <button type="submit">Сохранить</button> -->
    </form>
</div>