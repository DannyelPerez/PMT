angular.module('myApp', []).controller('appCtrl', function($scope, $filter) {
	var vm = this;

	vm.inputs = {
		presentValue: 0,
		rate: 0,
		numberOfPeriods: 0,
		rateView: 0
	}

	vm.outputs = {
		monthPay: 0,
		totalPay: 0
	}

	vm.tableResult = {
		pmt: 0,
		interest: 0,
		amortisation: 0
	}

	vm.table = [];

	vm.evaluate = function(){
		vm.outputs.monthPay = PMT(vm.inputs.rate, 
			vm.inputs.numberOfPeriods,vm.inputs.presentValue);
		vm.outputs.totalPay = vm.outputs.monthPay * vm.inputs.numberOfPeriods;
		fillTable();
	}
    
	vm.updateRate = function(){
		vm.inputs.rate = vm.inputs.rateView / 12;
	}

	function fillResults(){
		vm.tableResult.pmt = 0;
		vm.tableResult.amortisation = 0;
		vm.tableResult.interest = 0;
		for(let i = 0; i < vm.table.length; i++){
			vm.tableResult.pmt += vm.table[i].pmt;
			vm.tableResult.interest += vm.table[i].interest;
			vm.tableResult.amortisation += vm.table[i].amortisation;
		}
		vm.outputs.monthPay = $filter('number')(vm.outputs.monthPay, 2);
		vm.outputs.totalPay = $filter('number')(vm.outputs.totalPay, 2);
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

	function fillTable(){
		vm.table.length = 0;
		for(let i = 1; i <= vm.inputs.numberOfPeriods; i++){
			let obj = {
				month: i, rate: `${vm.inputs.rateView} %`, pmt: vm.outputs.monthPay
			}

			if(i === 1){
				obj.interest = vm.inputs.presentValue * (vm.inputs.rate / 100);
				obj.amortisation = obj.pmt - obj.interest;
				obj.balance = vm.inputs.presentValue - obj.amortisation;
				vm.table.push(obj);
				continue;
			}

			obj.interest = vm.table[i-2].balance * (vm.inputs.rate / 100);
			obj.amortisation = obj.pmt - obj.interest;
			obj.balance = vm.table[i-2].balance - obj.amortisation;
			vm.table.push(obj);
		}
		fillResults();
	}

});

