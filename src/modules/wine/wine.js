$('.tabs__link').click(function (){
	$(this).addClass('active').siblings().removeClass('active');
	$(this).parents('.tabs').find('.tabs__text').eq($(this).index()).addClass('active').siblings().removeClass('active')
})