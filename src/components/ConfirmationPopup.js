import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmationPopup(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.onRemoveCard();
  }

  // Примечание: в данном попапе нет никаких своих элементов, только заголовок и кнопка сабмита,
  // которые уже есть в PopupWithForm, от которого он "наследуется". Поэтому мы просто рендерим 
  // PopupWithForm, оставляя его props.children пустым. В рамках текущего проекта можно было вообще 
  // не создавать этот компонент, а сразу рендерить в мэйне PopupWithForm, передав ему нужные пропсы,
  // но в целом это не очень хорошая практика.
  return (
    <PopupWithForm
      name={props.name}
      title={props.title}
      button={props.button}
      sizeModifier={props.sizeModifier}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >
    </PopupWithForm>
  )
}

export default ConfirmationPopup;