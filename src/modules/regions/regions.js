$('.tab__link').click(function() {
	$(this).addClass('active').siblings().removeClass('active');
	$(this).parents('.tab').find('.tab__box').eq($(this).index()).addClass('active').siblings().removeClass('active');
})