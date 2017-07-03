angular.module('myApp', []).controller('appCtrl', function($scope) {
	var vm = this;


	function PMT(rate, numberOfPeriods, presentValue, fv, type) {
		let pmt, pvif;
		fv || (fv = 0);
		type || (type = 0);
		if (rate === 0)
			return (presentValue + fv)/numberOfPeriods;
		rate = rate / 100;
		pvif = Math.pow(1 + rate, numberOfPeriods);
		pmt = - rate * presentValue * (pvif + fv) / (pvif - 1);
		if (type === 1)
			pmt /= (1 + rate);
		return -(pmt);
	}

});

