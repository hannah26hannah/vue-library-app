<template>
  <el-timeline-item class="card" timestamp="2018/4/12" placement="top">
    <el-card>
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          placeholder="title"
          name="title"
          id="title"
          required
        />
        <label for="title" class="form__label">Title</label>
      </div>
      <div class="form__group-wrapper">
        <div class="form__group2 field writer">
          <input
            type="input"
            class="form__field"
            placeholder="writer"
            name="writer"
            id="writer"
            required
          />
          <label for="writer" class="form__label">Writer</label>
        </div>
        <div class="form__group2 field">
          <input
            type="input"
            class="form__field"
            placeholder="genre"
            name="genre"
            id="genre"
            required
          />
          <label for="genre" class="form__label">Genre</label>
        </div>
      </div>
      <!-- 인용 -->
      <blockquote>
        <p>committed 2018/4/12 20:46</p>
        <footer>By Tom</footer>
      </blockquote>
      <!-- Review -->
      <p>Review Review Review Review Review</p>
    </el-card>
  </el-timeline-item>
</template>

<style lang="scss" scoped>
$primary: #ffd04b;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 80%;
}
.form__group-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .form__group2 {
    position: relative;
    padding: 20px 0 0;
    margin-top: 10px;
    width: 50%;
  }

  .writer {
    margin-right: 10px;
  }
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: $gray;
  padding: 2px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 500;
  border-width: 2px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
</style>
