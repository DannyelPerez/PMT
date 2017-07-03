angular.module('myApp', []).controller('appCtrl', function($scope) {
	var vm = this;

	vm.inputs = {
		presentValue: 0,
		rate: 0,
		numberOfPeriods: 0
	}

	vm.outputs = {
		monthPay: 0,
		totalPay: 0
	}

	vm.evaluate = function(){
		vm.outputs.monthPay = PMT(vm.inputs.rate, 
			vm.inputs.numberOfPeriods,vm.inputs.presentValue);
		vm.outputs.totalPay = vm.outputs.monthPay * vm.inputs.numberOfPeriods;
		vm.outputs.monthPay = Math.round(vm.outputs.monthPay * 100) / 100
		vm.outputs.totalPay = Math.round(vm.outputs.totalPay * 100) / 100
	}

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

