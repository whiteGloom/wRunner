# Languages
* **[Русский](#шо-ита-ru "Русский")**

# Шо ита? [RU]
[↓ К навигации](#Навигация "↓ К навигации") | **[↑ To languages](#languages "↑ To languages")**

**wRunner** — плагин, добавляющий слайдер (бегунок) для выбора значения.
В плагине есть возможность устанавливать темы, шаг, минимальное и максимальное значение и т.д. Имеет два вида — одиночное и диапазон, а так же вертикальное и горизонтальное положение.
Имеет две реализации — на "чистом" JS и на основе jQuery.

Строение плагина — MVP с пассивным view. Три части программы, две из которых (view и модель) независимы от других. Presenter является связующим слоем, которому известно о двух других слоях. Он передаёт, в случае необходимости, данные в другие слои (через обсервер), хранит методы для добавления внешних обработчиков событий. Над всем стоит надстройка, которая оберегает пользователя от нежелательных изменений в плагине — собирает все три части в один слайдер, связует их, собирает пакет методов для работы с плагином.

**[Демо-страница плагина](https://whitegloom.github.io/wRunner/ "Демо-страница плагина")**

[Диаграмма структуры плагина](https://clck.ru/JXp86 "Диаграмма структуры плагина")

**В проекте используются:**

* **[Webpack](https://webpack.js.org/ "Webpack")**
* **[Pug](https://pugjs.org/ "Pug")**
* **[Stylus](http://stylus-lang.com/ "Stylus")**
* **[Jasmine](https://jasmine.github.io/ "Jasmine")**
* **[ES Lint](https://eslint.org/ "ES Lint")**

**Внимание!**
jQuery версия слайдера требует [jQuery](https://jquery.com/ "jQuery"), версией **не ниже 3.4.1**.

## Навигация
* **[Шо ита? [RU]](#шо-ита-ru "Шо ита? [RU]")**
	* **Навигация**
	* **[Инструкция для пользователя](#Инструкция "Инструкция для пользователя")**
		+ **[Создание экземпляра](#Создание-экземпляра "Создание экземпляра")**
	+ **[Инструкция для работы с исходным кодом](#Инструкция-для-работы-с-исходным-кодом "Инструкция для работы с исходным кодом")**
		+ **[Методы](#Методы "Методы")**
			- **[setType method](#setType-method "setType method")**
			- **[setLimits method](#setLimits-method "setLimits method")**
			- **[setStep method](#setStep-method "setStep method")**
			- **[setSingleValue method](#setSingleValue-method "setSingleValue method")**
			- **[setRangeValue method](#setRangeValue-method "setRangeValue method")**
			- **[setValueNoteDisplay method](#setValueNoteDisplay-method "setValueNoteDisplay method")**
			- **[setNearestValue method](#setNearestValue-method "setNearestValue method")**
			- **[setDivisionsCount method](#setDivisionsCount-method "setDivisionsCount method")**
			- **[setRoots method](#setRoots-method "setRoots method")**
			- **[setTheme method](#setTheme-method "setTheme method")**
			- **[setDirection method](#setDirection-method "setDirection method")**
			- **[getType method](#getType-method "getType method")**
			- **[getStep method](#getStep-method "getStep method")**
			- **[getLimits method](#getLimits-method "getLimits method")**
			- **[getValue method](#getValue-method "getValue method")**
			- **[getRoots method](#getRoots-method "getRoots method")**
			- **[getValueNoteDisplay method](#getValueNoteDisplay-method "getValueNoteDisplay method")**
			- **[getDivisionsCount method](#getDivisionsCount-method "getDivisionsCount method")**
			- **[getTheme method](#getTheme-method "getTheme method")**
			- **[getDirection method](#getDirection-method "getDirection method")**
		+ **[События](#События "События")**
			- **[onStepUpdate method](#onStepUpdate-method "onStepUpdate method")**
			- **[onTypeUpdate method](#onTypeUpdate-method "onTypeUpdate method")**
			- **[onLimitsUpdate method](#onLimitsUpdate-method "onLimitsUpdate method")**
			- **[onValueUpdate method](#onValueUpdate-method "onValueUpdate method")**
			- **[onRootsUpdate method](#onRootsUpdate-method "onRootsUpdate method")**
			- **[onDivisionsCountUpdate method](#onDivisionsCountUpdate-method "onDivisionsCountUpdate method")**
			- **[onValueNoteDisplayUpdate method](#onValueNoteDisplayUpdate-method "onValueNoteDisplayUpdate method")**
			- **[onThemeUpdate method](#onThemeUpdate-method "onThemeUpdate method")**
			- **[onDirectionUpdate method](#onDirectionUpdate-method "onDirectionUpdate method")**
	* **[Всё.](#Всё. "Всё.")**

## Инструкция для пользователя

### Создание экземпляра
**Для JS Native версии:**
1. Подключить на странице файл **wrunner-native.js**
2. Выполнить команду: `var slider = wRunner(options);`

**Для jQuery версии:**
1. Подключить на странице **jquery**, версией не меньше 3.4.1
2. Подключить на странице файл **wrunner-jquery.js**
3. Выполнить команду: `$(DOM element).wRunner([options]);`

*Arguments:*
* **options** - type: object. Properties:
	- **step** - (watch [setStep method](#setStep-method "setStep method"))
		+ Default: 1
	- **type** - (watch [setType method](#setType-method "setType method"))
		+ Default: "single"
	- **limits** - (watch [setLimits method](#setLimits-method "setLimits method"))
		+ Default: {minLimit: 0, maxLimit: 100}
	- **singleValue** - (watch [setSingleValue method](#setSingleValue-method "setSingleValue method"))
		+ Default: 50
	- **rangeValue** - (watch [setRangeValue method](#setRangeValue-method "setRangeValue method"))
		+ Default: { minValue: 20, maxValue: 80 }
	- **roots** - (watch [setRoots method](#setRoots-method "setRoots method")) **(Доступен только в JS Native версии)**
		+ Default: document.body
	- **divisionsCount** - (watch [setDivisionsCount method](#setDivisionsCount-method "setDivisionsCount method"))
		+ Default: 5
	- **valueNoteDisplay** - (watch [setValueNoteDisplay method](#setValueNoteDisplay-method "setValueNoteDisplay method"))
		+ Default: true
	- **theme** - (watch [setTheme method](#setTheme-method "setTheme method"))
		+ Default: "default"
	- **direction** - (watch [setDirection method](#setDirection-method "setDirection method"))
		+ Default: "horizontal"
	- **onStepUpdate** - (watch [onStepUpdate method](#onStepUpdate-method "onStepUpdate method"))
	- **onTypeUpdate** - (watch [onTypeUpdate method](#onTypeUpdate-method "onTypeUpdate method"))
	- **onLimitsUpdate** - (watch [onLimitsUpdate method](#onLimitsUpdate-method "onLimitsUpdate method"))
	- **onValueUpdate** - (watch [onValueUpdate method](#onValueUpdate-method "onValueUpdate method"))
	- **onRootsUpdate** - (watch [onRootsUpdate method](#onRootsUpdate-method "onRootsUpdate method"))
	- **onDivisionsCountUpdate** - (watch [onDivisionsCountUpdate method](#onDivisionsCountUpdate-method "onDivisionsCountUpdate method"))
	- **onValueNoteDisplayUpdate** - (watch [onValueNoteDisplayUpdate method](#onValueNoteDisplayUpdate-method "onValueNoteDisplayUpdate method"))
	- **onThemeUpdate** - (watch [onThemeUpdate method](#onThemeUpdate-method "onThemeUpdate method"))
	- **onDirectionUpdate** - (watch [onDirectionUpdate method](#onDirectionUpdate-method "onDirectionUpdate method"))

[↑ К навигации](#Навигация "↑ К навигации")


## Инструкция для работы с исходным кодом
**Развёртывание проекта**
Для установки зависимостей использовать:

```
npm install
```

**Команды npm**

* `npm run build` - разовая сборка проекта;
* `npm run build-watch` - запуск автоматической пересборки;
* `npm run build-live` - запуск сервера;
* `npm run test` - запуск тестов;

**Aliases (сокращения):**
Алиасы прописываются в файле package.json (находится в корневом каталоге), в параметре **`_moduleAliases`**, и должны начинаться с символа `@`.
Webpack и Jasmine автоматически подгрузят сокращения.

*Пример:*
```
// Создание сокращения.
// Файл "package.json":
{
	...
	"scripts": { ... },
	"_moduleAliases": {
		"@ИмяСокращения": "./путьДоСокращения",
		"@test": "./test.js"
	},
	...
}
```
[↑ К навигации](#Навигация "↑ К навигации")

### Методы

#### setType method
Меняет тип слайдера.

```
.setType(type)
```

*Arguments:*

* **type** - type: string. Avaible values:  перечислены в typeConstants (см. [getTypes method](#getTypes-method "getTypes method")).

*Returns:*
**Object**. Properties:
* **value** - type: string. Тип слайдера.
* **typeConstants** - type: object. Список зарезервированных значений.

*Triggering:*
**onTypeUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setLimits method
Меняет минимально и максимально возможные значения слайдера.

```
.setLimits([options])
```

*Arguments:*

* **options** - type: object. Properties:
	- **minLimit** - type: number. Default - минимальное значение.
	- **maxLimit** - type: number. Default - максимальное значение.

*Note:*
**Если минимальное значение бальше максимального, то они будут поменяны местами.**

*Returns:*
**Object**. Properties:
* **minLimit** - type: number. Минимальное значение слайдера.
* **maxLimit** - type: number. Максимальное значение слайдера.
* **valuesCount** - type: number. Количество допустимых занчений. (максимальное - минимальное)

*Triggering:*
**onLimitsUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setStep method
Меняет шаг слайдера.

```
.setStep(step)
```

*Arguments:*

* **step** - type: number. Avaible values: 1 - infinity.

*Returns:*
**Number** - шаг слайдера

*Triggering:*
**onStepUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setSingleValue method
Меняет значение слайдера для типа "single". Если сменить тип слайдера, значение сохраниется. Можно использовать и тогда, когда тип слайдера иной.

```
.setSingleValue([value])
```

*Arguments:*

* **value** - type: number. Defalut: значение слайдера.

*Note:*
**Если значение слайдера выходит за границы, то оно приравнивается ближайшей границе.**

*Returns:*
+ **Object**. Properties:
	- **value** - type: number. Значение слайдера.
	- **selected** - type:  number. Количество "выделенных" значений (значение - минимальное значение слайдера)

*Triggering:*
**onValueUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------

#### setRangeValue method
Меняет значение слайдера для типа "range". Если сменить тип слайдера, значение сохраняется. Можно использовать и тогда, когда тип слайдера иной.

```
.setRangeValue([values])
```

*Argumetns:*
* **values** - type: object. Properties: 
	- **minValue** - type: number. Defaults: текущее меньшее значение. Меньшее значение слайдера
	- **maxValue** - type: number. Defaults: текущее большее значение. Большее значение слайдера

*Notes:*
* **Если значение слайдера выходит за границы, то оно приравнивается ближайшей границе.**
* **Если меньшее значение становится больше, чем большее, то они меняются местами.**


*Returns:*
* **Object**. Properties:
	- **minValue** - type: number. Меньшее значение слайдера.
	- **maxValue** - type: number. Большее значение слайдера.
	- **selected** - type:  number. Количество "выделенных" значений (большее значение - меньшее значение)

*Triggering:*
**onValueUpdate**, передаёт тоже, что и возвращает.

#### setValueNoteDisplay method
Меняет отображение показателя значения над бегунком.

```
.setValueNoteDisplay(value)
```

*Arguments:*
* **value** - type: boolean.

*Returns:*
**Boolean** - отображение показателя надбегунком.

*Triggering:*
**onValueNoteDisplayUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------


#### setNearestValue method
Меняет ближайшее к передаваемому аргументу значение слайдера.

```
.setNearestValue(value, viaPercents)
```

*Arguments:*
* **value** - type: number. Новое начение.
* **viaPercents** - type: number. Процентное значение.

*Notes:*
* **Если тип слайдера - "single", то просто изменит его значение.**
* **Новое значение, при аргументе viaPercents равном true, расчитывается путём умножения количества допустимых значений на передаваемое значение.**
* **Ближайшее значение определяется путём сложения меньшего и большего значений и деления результата на 2. Если передаваемое значение меньше этого результата, то меняется меньшее значение, иначе - большее.**

*Examples:*
```
.setLimits({minLimit: 0, maxLimit: 100}); // Минимальное значение: 0, максимальное: 100
.setType("single") // Тип слайдера: "single"
.setSingleValue(50); // Значение слайдера: 50

.setNearestValue(75) // Принимая 75, изменит единичное значение слайдера на 75
.setNearestValue(75, true) // Принимая 75%, изменит единичное значение слайдера на 75

```
```
.setLimits({minLimit: 0, maxLimit: 100}); // Минимальное значение: 0, максимальное: 100
.setType("single") // Тип слайдера: "range"
.setRangeValue({minValue: 20, maxValue: 80}); // Меньшее значение 20, большее 80

.setNearestValue(75) // Принимая 75, ближайшим будет большее значение слайдера, изменит его на 75
.setNearestValue(75, true) // Принимая 75%, ближайшим будет большее значение слайдера, изменит его на 75

```

*Returns:*
**Передаёт управление функциям setSingleValue или setRangeValue (В зависимости от текущего типа слайдера), возвращает результат их работы.**

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setDivisionsCount method
Меняет количество делений под слайдером.

```
.setDivisionsCount(count)
```

*Arguments:*

* **count** - type: number. Avaible values: 0 - infinity.

*Note:*
**Если попытаться установить количество равным 1, то оно будет увеличено до 2.**


*Returns:*
**Number** - количество делений под слайдером

*Triggering:*
**onDivisionsCountUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setRoots method
Менеят корневой элемент слайдера.

```
.setRoots(roots)
```

*Arguments:*

* **roots** - type: DOM element.

*Returns*
**DOM element** - корневой элемент слайдера

*Triggering:*
**onRootsUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setTheme method
Меняет тему слайдера.

```
.setTheme(theme)
```

*Arguments:*
* **theme** - type: string

*Returns:*
**String** - тема

*Triggering:*
**onThemeUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### setDirection method
Меняет положение слайдера.

```
.setDirection(direction)
```

*Arguments:*
* **direction** - type: string. Avaible values: перечислены в directionConstants (см. [getDirection method](#getDirection-method "getDirection method"))

*Returns:*
**Object**. Properties:
* **value** - type: string. Значение положения.
* **constants** - type: object. Список зарезервированных значений в формате {horizontalValue: "horizontal"}.

*Triggering:*
**onDirectionUpdate**, передаёт тоже, что и возвращает.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getType method
Возвращает типы слайдера

```
.getType()
```

*Returns:*

**Object**. Properties:
* **value** - type: string. Текущий тип слайдера.
* **typeConstants** - object. Properties:
	- **singleValue / rangeValue** - type: string. Список зарезервированных значений в формате {horizontalValue: "horizontal"}.

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getStep method
Возвращает текущий шаг слайдера

```
.getStep()
```

*Returns:*
**Number**

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getLimits method
Возвращает текущие минимально и максимально возможные значения слайдера

```
.getLimits()
```

*Returns:*
**Object**. Properties:
* **minLimit** - type: number. Минимальное значение слайдера.
* **maxLimit** - type: number. Максимальное значение слайдера.
* **valuesCount** - type: number. Количество допустимых занчений. (максимальное - минимальное)

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getValue method
Возвращает значение слайдера.

```
.getValue()
```

*Returns:*
* **Если тип слайдера - "single":**
	+ **Object**. Properties:
		- **value** - type: number. Значение слайдера.
		- **selected** - type:  number. Количество "выделенных" значений (значение - минимальное значение слайдера)
* **Если тип слайдера - "range":
	+ **Object**. Properties:
		- **minValue** - type: number. Меньшее значение слайдера.
		- **maxValue** - type: number. Большее значение слайдера.
		- **selected** - type:  number. Количество "выделенных" значений (большее значение - меньшее значение)

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getRoots method
Возвращает текущий корневой элемент слайдера.

```
.getRoots()
```

*Returns*
**DOM element**

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getValueNoteDisplay method
Возвращает отображение показателя значения над бегунком.

```
getValueNoteDisplay()
```

*Returns:*
**Boolean**

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getDivisionsCount method
Возвращает количество делений под слайдером.

```
.getDivisionCount method
```

*Returns:*
**Number**

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getTheme method
Возвращает тему слайдера.

```
.getTheme()
```

*Returns:*
**String**

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### getDirection method
Возвращает положение слайдера.

```
.getDirection()
```

*Returns:*
**Object** - Properties:
* **value** - type: string. Значение положения.
* **constants** - type: object. Список зарезервированных значений в формате {horizontalValue: "horizontal"}.

[↑ К навигации](#Навигация "↑ К навигации")

------------

### События

#### onStepUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении шага слайдера

```
.onStepUpdate(function(step){
	...
})
```

**Передаваемые значения:**
Смотреть *[setStep method](#setStep-method "setStep method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onTypeUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении типа слайдера

```
.onTypeUpdate(function(type){
	...
})
```

**Передаваемые значения:**
Смотреть *[setType method](#setType-method "setType method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onLimitsUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении крайних значений слайдера

```
.onLimitsUpdate(function(limits){
	...
})
```

**Передаваемые значения:**
Смотреть *[setLimits method](#setLimits-method "setLimitms ethod")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onValueUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении значений слайдера

```
.onValueUpdate(function(values){
	...
})
```

**Передаваемые значения:**
Смотреть *[setValue method](#setValue-method "setValue method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onRootsUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении корневого элемента слайдера

```
.onRootsUpdate(function(roots){
	...
})
```

**Передаваемые значения:**
Смотреть *[setRoots method](#setRoots-method "setRoots method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onDivisionsCountUpdate method
Устанавливает функцию-обработчик, вызываемую при изменении количества делений внизу слайдера

```
.onDivisionsCountUpdate(function(count){
	...
})
```

**Передаваемые значения:**
Смотреть *[setDivisionsCount method](#setDivisionsCount-method "setDivisionsCount method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onValueNoteDisplayUpdate method
Устанавливает функцию-обработчик, вызываемую при изменении отображения показателя значения над бегунком

```
.onValueNoteDisplayUpdate(function(value){
	...
})
```

**Передаваемые значения:**
Смотреть *[setValueNoteDisplay method](#setValueNoteDisplay-method "setValueNoteDisplay method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onThemeUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении темы слайдера

```
.onThemeUpdate(function(styles){
	...
})
```

**Передаваемые значения:**
Смотреть *[setTheme method](#setTheme-method "setTheme method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------



#### onDirectionUpdate method
Устанавливает функцию-обработчик, вызываемую при обновлении положения слайдера

```
.onDirectionUpdate(function(styles){
	...
})
```

**Передаваемые значения:**
Смотреть *[setDirection method](#setDirection-method "setDirection method")*

[↑ К навигации](#Навигация "↑ К навигации")

------------


## Всё.
**-whiteGloom**