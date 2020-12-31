<template>
  <el-form ref="cardForm">
    <el-timeline-item
      class="card-container"
      timestamp="2018/4/12"
      placement="top"
    >
      <el-card class="card">
        <!-- Title -->
        <div class="form__group">
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
        <!-- writer and genre -->
        <div class="form__group-second">
          <div class="form__group-second-item writer">
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
          <div class="form__group-second-item">
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
        <!-- quotes -->
        <div class="form__group">
          <textarea
            class="form__field"
            id="quote"
            name="quote"
            rows="5"
            cols="25"
            placeholder="record something memorable .."
          ></textarea>
          <label for="quote" class="form__label">Quote</label>
        </div>

        <!-- Review -->
        <div class="form__group">
          <textarea
            class="form__field"
            id="review"
            name="review"
            rows="5"
            cols="25"
            placeholder="make a review .."
          ></textarea>
          <label for="review" class="form__label">Review</label>
        </div>
        <div class="form__button">
          <el-button type="primary" plain>submit</el-button>
          <el-button type="primary" plain>reset</el-button>
        </div>
      </el-card>
    </el-timeline-item>
  </el-form>
</template>
