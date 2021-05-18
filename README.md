# Mesto

Учебный проект по фронтенду, реализованный с помощью библиотеки React.

Являет собой одностраничный сайт, на котором пользователи (студенты Яндекс.Практикум) могут делиться своими изображениями и просматривать чужие. Токен текущего пользователя прописан в "хардкоде", ручная регистрация/авторизация не предусмотрены. 

## Функционал

Проект располагает следующими возможностями:
* при запуске рендерится массив карточек с изображениями, полученный от сервера (среди карточек - как наши, так и добавленные другими пользователями);
* свои карточки можно удалять (иконка корзины в правом верхнем углу), чужие - нет;
* под любой карточкой можно поставить лайк либо снять его;
* можно добавлять новые карточки (изображения принимаются только в виде ссылок);
* можно изменить имя текущего пользователя и его статус;
* можно изменить аватар текущего пользователя (изображения принимаются только в виде ссылок);
* при клике на карточку можно просмотреть изображение в полном размере;
* все изменения сохраняются на сервере.

## Технологии

В проекте применяются:
* React;
* хуки;
* функциональные компоненты;
* fetch;
* ООП;
* Nested БЭМ;
* отзывчивая вёрстка (минимальное разрешение - 320px).

## Запуск

Для запуска скачайте папку **build** с уже собранным проектом и откройте файл **index.html** с помощью браузера. 