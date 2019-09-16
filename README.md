# Шо ита? [RU]
wRunner v 1.0.0 - плагин, добавляющий слайдер (бегунок).
Позволяет устанавливать темы, шаг, минимальное и максимальное значение, имеет два вида - одиночное и диапазон. Имеет вертикеальное и горизонтальное положение.
Имеет две реализации - на "чистом" JS и на основе jQuery.

Строение плагина - MVC с пассивным view. Три части программы, две из которых (view и модель) независимы от других. Presenter является связующим слоем, которому известно о двух других слоях. Он передаёт, в случае необходиости, данные в другие слои (через обсервер), хранит методы для добавления внешних обработчиков событий. Над всем стоит надстройка, которая оберегает пользователя от нежелательных изменений в плагин - собирает все три части в один слайдер, связует их, собирает пакет методов для работы с плагином, инициализирует настройки пользователя.


<a href="https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#RzVhNc5swEP01HNsBBAYfY8dJZ5LOdCaHNL0poBhNATlCNnZ%2FfQVIgCTcYNcfucjSSlq0T4%2B3iy0wz7b3FK6S7yRGqeXa8dYCt5brOp4d8p%2FKsmssQRg0hiXFsVjUGZ7wHySMtrCucYwKZSEjJGV4pRojkucoYooNUkpKddkbSdWnruASGYanCKam9RnHLGmsoRt09m8ILxP5ZGcybWYyKBeLSIoExqTsmcDCAnNKCGt62XaO0go8iUuz727PbHswinI2ZsPDvc9Wv4qHh%2Ffk8TEtF%2B775PmLhHkD07WIWJyW7SQElKzzGFVebAvMygQz9LSCUTVb8kvntoRlKR85vCvcIcrQdu9BnTZ8zhtEMsToji%2BRGxzBGUGZUJyx7PD3p8KW9LD3ZDBQ3Pmydd3BwjsCmUNQMkDaYFT%2BAyjnIkB5EgUBFHBNpBx3AKnJuYByDaCyRhGujFQrJ58GKWAgtaKo4OEgenW0gA8UtJzg2mg5JrEMlFAe31SCz0dRCosCRxyNgkHKTHMPL7TF7GelbV99MXoRSlf1b7f9wU4Och5Us8n15fhFOqwG3b56JDc2h0axkXO0q%2BGBkTWN0MevGo9vidhHRDOvui%2BmAzcpbRSlkOGNetyh6xVP%2BEEwD6Rjkv7eAY0hTZhiVz956Y4mqqM2KUhHDQ6Go5ptbdj%2FQUDzfT0ZATsyBQeR6RjmnpCAshr71AT0gEZA%2F0gCeqHmyL4wAT2TgPxGp4uqnTkWZ8u0bvk5q7aend3ULT%2BpXXfu6nYmjFUL6jas21u5WOM1TyRMpWzBKPmN5iQllFtykvOVszecppoJpniZV7xv8hqYVWkJ8%2BL6RkxkOI6rxwwmNbXuPEUVEKp5baCwbFNYn4vTs6U137hU8loguhkoArg7%2Fs2zD6sTFwCBCtRQuRReNP9PDpJfQb8YFklbNg0prtOXWyGjYwS3L7et%2BJ5fcP2RiuteU3HbwlBwx9dJMVZx26pTOtI%2F786tuMFJOSe44xzAna4yOIyn1%2BDcHkG5UJbXqkNfV%2ByxnPO1etX3Lsy58CDOHVlmKlWmPVb0lCrTuZTogbH8869JQKBr1bEE9HT1PBkB%2BbD7r7FZ3v1jCxZ%2FAQ%3D%3D">Диаграмма приложения</a>

## Внимание
`jQuery` реализация требует `jQuery` версией не ниже 3.4.1

## Интсрукция
Будет позже.

## Всё.
`Просьба`: если будете использовать этот шаблон - пожалуйста, не удаляйте мою строчку в поле "contributors" в package.json.

`-whiteGloom`
