document.addEventListener("DOMContentLoaded", test);

function test() {
	var wrModel = new wRunner.model();
	var wrView = new wRunner.view();
	var wrPresenter = new wRunner.presenter({model: wrModel, view: wrView});
	wrPresenter.draw();

	// Для проверок.
	setTimeout(() => {

		console.log('Проверка произведена. (3 sec)')
	}, 3000)
}