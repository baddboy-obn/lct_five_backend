# Модульная система адаптации сотрудника внутри компании с интерактивным плеером видео контента с гарантией просмотра

### В основу системы легла собственная разработка интерактивного плеера с гарантией просмотра видео контента на основе модели компьютерного зрения "Media PIPE" от Google ###

```
Первое на что хочется обратить внимание - это остутсвией систмы идентификации 
пользователя. Таких систем великое множество и повторять их фукнционал не имеет никакого смысла. 
Вместо этого на вход системы передаем уникальный идентификатор пользователя из любой системы, 
который сопоставляется с уникальной ссылкой на прохождения теста адаптации и вокруг нее 
делается вся аналитическая работа
```

```
Система так же имеет свои конструктор тестовы, на данном этапе пока несколько интерактивных полей
с единичным множественным вариантом выбора ответов, а так же встраиванеим нашего интерактивного плеера. 
В дальнейшем при неоходимости можно будет встроить и другие поля
```

```
Система снабжена интерактивным логированием каждого шага пользователя, с фиксацией не только базовых действий(клики, скролы, прохожение тестов и тд),
но и специфических, так как Внимательность, Вовлеченность, Эмоциональность, Усталость и Рассеяность, которые рассчтиываются в нашем плеере, который, 
в свою очередь запрашивает доступ к веб камере респондента, откуда берет видео поток для анализа.
```


**ОЧЕНЬ ВАЖНЫЙ МОМЕНТ**

```Все расчеты специфических действий происходят на стороне клиента, что полностью исключает передачу персональных данных и не по падает под дейтсвией ФЗ 152 "О пекрсональных данных"```





