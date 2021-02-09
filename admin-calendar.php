<script>
    window.blockedTimeAndDates = JSON.parse('<?php echo json_encode(get_option('wporg_dates_option')); ?>');
</script>
<div class="calendar-wrap">
    <div class="date-input"></div>
    <div class="time-col">
        <strong class="checked-date"></strong>
        <ul class="time-list">
        </ul>
        <button class="reserve-btn" hidden>Снять бронь</button>
    </div>
</div>
