document.addEventListener("DOMContentLoaded", test);

function test() {
	var wrModel = new wRunner.Model();
	var wrView = new wRunner.View();
	var wrPresenter = new wRunner.Presenter({model: wrModel, view: wrView});
	wrView.generateDOM()
	wrPresenter.appendTo(document.getElementById('exm1'));
	wrPresenter.draw();

	var wrModel2 = new wRunner.Model();
	var wrView2 = new wRunner.View();
	var wrPresenter2 = new wRunner.Presenter({model: wrModel2, view: wrView2});
	wrView2.generateDOM();
	wrPresenter2.appendTo(document.getElementById('exm2'));
	wrPresenter2.draw();
	wrPresenter2.setStep(5)

	// Для проверок.
	setTimeout(() => {
	}, 3000)
}