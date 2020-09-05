$('.cls-10').click(function(){
	$(this).addClass('active').siblings().removeClass('active')
	$(`[data-box=${$(this).data('item')}]`).fadeIn().siblings().hide();
})