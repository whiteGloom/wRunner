document.addEventListener("DOMContentLoaded", test);

function test() {
	var wrModel = new wRunner.Model();
	var wrView = new wRunner.View();
	var wrPresenter = new wRunner.Presenter({model: wrModel, view: wrView});
	wrView.generateBaseDOM();
	wrView.setRoots(document.getElementById('exm1'));
	wrPresenter.draw();
	
	var wrModel2 = new wRunner.Model();
	var wrView2 = new wRunner.View();
	var wrPresenter2 = new wRunner.Presenter({model: wrModel2, view: wrView2});
	wrView2.generateBaseDOM();
	wrView2.setStyles({direction: {value: 'vertical'}});
	wrView2.setRoots(document.getElementById('exm2'));
	wrPresenter2.draw();
	wrModel2.setStep(5);
	wrModel2.setType('range');

	// Для проверок.
	setTimeout(() => {
		//wrModel2.setValue({minValue: 75, maxValue: 25}, true)
	}, 3000)
}