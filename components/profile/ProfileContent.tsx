import logoutIcon from "@/public/images/profile/logout-icon.svg";
import editIcon from "@/public/images/profile/edit-icon.svg";

const ProfileContent = () => {
  return (
    <div>
      <div>
        <div>
          <h1>title</h1>
          <span>subtitle</span>
        </div>
        <button>Редактировать</button>
      </div>
      <p>
        Рыбатекст используется дизайнерами, проектировщиками и фронтендерами,
        когда нужно быстро заполнить макеты или прототипы содержимым. Это
        тестовый контент, который не должен нести никакого смысла, лишь показать
        наличие самого текста или продемонстрировать типографику в деле.
      </p>
      <button>Выйти</button>
    </div>
  );
};

export default ProfileContent;
