import './styles.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header">
  <h1 class="header__h1">Birthdays</h1>
</header>
<main class="main">
  <section class="section">
    <h2 class="section__header">Add birthdays</h2>
    <div class="form__container">
      <form class="form">
        <div class="input__container">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div class="input__container">
          <label for="date">Date</label>
          <input type="date" name="date" id="date" />
        </div>
        <button class="submit__btn">Add birthday</button>
      </form>
    </div>
  </section>
  <article class="article">
    <h2 class="article__header">All birthdays</h2>
    <div class="table__container">
      <table class="table">
        <thead>
          <tr>
            <th class="th-name">Name</th>
            <th>Birthdays (yy-mm-dd)</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </article>
</main>
<footer class="footer"><h2>Footer</h2></footer>
`;
