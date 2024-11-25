<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const urlApi = inject("url_api");
const user = inject("user");

const { productId, productName } = defineProps(["productId", "productName"]);

const loadingAddReview = ref(false);
const review = ref(null);
const rating = ref(5);
const showModalReview = ref(false);
const showModalReviewBg = ref(false);
// Hình ảnh review
const imageReviewShow = ref([]);
const commentReview = ref("");

// get review
const getReview = async () => {
  try {
    const res = await axios.post(`${urlApi}/api/v1/review/getReview`, { productId });
    console.log(res.data);
    return res.data.metadata;
  } catch (error) {
    console.error(error);
  }
};

review.value = await getReview();

// handle progress bar star
const calcPercentProgress = (number) => {
  const percent = (number / review.value.summary.total_reviews) * 100;
  return percent;
};

// Xóa image review show
const removeImageReviewShow = (i) => {
  imageReviewShow.value = imageReviewShow.value.filter((item, index) => index !== i);
};

// add image review show
const changeReviewImage = async (event) => {
  let files = event.target.files;
  for (const file of files) {
    if (imageReviewShow.value.length === 3) {
      $toast.error("Chọn tối đa 3 ảnh", {
        position: "top",
      });
      break;
    }
    const base64 = await toBase64(file);
    imageReviewShow.value.push(base64);
  }
};

// Hàm chuyển đổi file image sang Base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // Kết quả Base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Đọc file
  });
};

// func add review to db
const addReview = async () => {
  if (!user) {
    $toast.default("Vui lòng đăng nhập", {
      position: "top",
    });
    return;
  }
  try {
    loadingAddReview.value = true;
    const res = await axios.post(`${urlApi}/api/v1/review/addReview`, {
      productId,
      userId: user._id,
      rating: rating.value,
      review_text: commentReview.value,
      imageReviews: imageReviewShow.value,
    });
    console.log(res.data);
    $toast.success(res.data.message, {
      position: "top",
    });
    review.value = await getReview();
    // clear value
    showModalReview.value = false;
    showModalReviewBg.value = false;
    rating.value = 5;
    imageReviewShow.value = [];
    commentReview.value = "";
  } catch (error) {
    // Kiểm tra lỗi và xử lý phù hợp
    if (error.response) {
      // Lỗi từ server
      $toast.error(error.response.data.message || "Lỗi từ server", {
        position: "top",
      });
    } else if (error.request) {
      // Không nhận được phản hồi
      throw new Error("Không có phản hồi từ server. Vui lòng thử lại.");
    } else {
      // Lỗi khác
      throw new Error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  } finally {
    loadingAddReview.value = false;
  }
};
</script>

<template>
  <section class="box-review">
    <div class="bg-color-white">
      <h2 class="box-review__title">Đánh giá & nhận xét {{ productName }}</h2>
      <div v-if="review" class="box-review__overview">
        <div class="box-left">
          <span class="review-average">{{ review.summary.average_rating }}/5</span>
          <ul class="list-star">
            <li class="item-star"><i class="bi bi-star-fill review-star-icon"></i></li>
            <li class="item-star"><i class="bi bi-star-fill review-star-icon"></i></li>
            <li class="item-star"><i class="bi bi-star-fill review-star-icon"></i></li>
            <li class="item-star"><i class="bi bi-star-fill review-star-icon"></i></li>
            <li class="item-star"><i class="bi bi-star-fill review-star-icon"></i></li>
          </ul>
          <router-link to="#" class="review-total"
            ><span class="fw-bold">{{ review.summary.total_reviews }}</span> đánh
            giá</router-link
          >
        </div>
        <div class="box-right">
          <div class="review-start__detail">
            <div class="review-start__detail--item">
              <div class="item-label">
                <span>5</span>
                <span><i class="bi bi-star-fill review-star-icon"></i></span>
              </div>
              <div class="item-progress">
                <v-progress-linear
                  class="h-100"
                  color="red-darken-2"
                  :model-value="
                    calcPercentProgress(review.summary.ratings_by_stars.five_star)
                  "
                  rounded
                ></v-progress-linear>
              </div>
              <span class="item-total"
                >{{ review.summary.ratings_by_stars.five_star }} đánh giá</span
              >
            </div>
            <div class="review-start__detail--item">
              <div class="item-label">
                <span>4</span>
                <span><i class="bi bi-star-fill review-star-icon"></i></span>
              </div>
              <div class="item-progress">
                <v-progress-linear
                  class="h-100"
                  color="red-darken-2"
                  :model-value="
                    calcPercentProgress(review.summary.ratings_by_stars.four_star)
                  "
                  rounded
                ></v-progress-linear>
              </div>
              <span class="item-total"
                >{{ review.summary.ratings_by_stars.four_star }} đánh giá</span
              >
            </div>
            <div class="review-start__detail--item">
              <div class="item-label">
                <span>3</span>
                <span><i class="bi bi-star-fill review-star-icon"></i></span>
              </div>
              <div class="item-progress">
                <v-progress-linear
                  class="h-100"
                  color="red-darken-2"
                  :model-value="
                    calcPercentProgress(review.summary.ratings_by_stars.three_star)
                  "
                  rounded
                ></v-progress-linear>
              </div>
              <span class="item-total"
                >{{ review.summary.ratings_by_stars.three_star }} đánh giá</span
              >
            </div>
            <div class="review-start__detail--item">
              <div class="item-label">
                <span>2</span>
                <span><i class="bi bi-star-fill review-star-icon"></i></span>
              </div>
              <div class="item-progress">
                <v-progress-linear
                  class="h-100"
                  color="red-darken-2"
                  :model-value="
                    calcPercentProgress(review.summary.ratings_by_stars.two_star)
                  "
                  rounded
                ></v-progress-linear>
              </div>
              <span class="item-total"
                >{{ review.summary.ratings_by_stars.two_star }} đánh giá</span
              >
            </div>
            <div class="review-start__detail--item">
              <div class="item-label">
                <span>1</span>
                <span><i class="bi bi-star-fill review-star-icon"></i></span>
              </div>
              <div class="item-progress">
                <v-progress-linear
                  class="h-100"
                  color="red-darken-2"
                  :model-value="
                    calcPercentProgress(review.summary.ratings_by_stars.one_star)
                  "
                  rounded
                ></v-progress-linear>
              </div>
              <span class="item-total"
                >{{ review.summary.ratings_by_stars.one_star }} đánh giá</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="box-review__experience d-none"></div>
      <div class="box-review__button">
        <p class="box-review__button--lable">Bạn đánh giá sao về sản phẩm này?</p>
        <button
          @click.prevent="(showModalReview = true), (showModalReviewBg = true)"
          class="btn box-review__button--btn"
        >
          Đánh giá ngay
        </button>
      </div>
      <div v-if="review" class="box-review__filter">
        <p class="title">Lọc theo</p>
        <div class="group-btn">
          <button class="box-review__filter--btn active">Tất cả</button>
          <button class="box-review__filter--btn">Có hình ảnh</button>
        </div>
        <div class="group-btn">
          <button class="box-review__filter--btn">
            <span>5 <i class="bi bi-star-fill review-star-icon"></i></span>
          </button>
          <button class="box-review__filter--btn">
            <span>4 <i class="bi bi-star-fill review-star-icon"></i></span>
          </button>
          <button class="box-review__filter--btn">
            <span>3 <i class="bi bi-star-fill review-star-icon"></i></span>
          </button>
          <button class="box-review__filter--btn">
            <span>2 <i class="bi bi-star-fill review-star-icon"></i></span>
          </button>
          <button class="box-review__filter--btn">
            <span>1 <i class="bi bi-star-fill review-star-icon"></i></span>
          </button>
        </div>
      </div>
      <div v-if="review" class="box-review__comment">
        <div class="item" v-for="comment in review.comments" :key="comment._id">
          <div class="item-avatar">
            <img v-if="comment.user.avatar" :src="comment.user.avatar" />
            <span v-else>N</span>
          </div>
          <div class="item-info">
            <div class="item-info_box-name">
              <span class="item-info_name">{{ comment.user.name }}</span>
              <span class="date-time">
                <i class="bi bi-clock icon"></i>
                <span>{{ comment.createdAt }}</span>
              </span>
            </div>
            <ul class="comment-stars">
              <li class="comment-star-item" v-for="n in comment.rating" :key="n">
                <i class="bi bi-star-fill review-star-icon"></i>
              </li>
              <li class="comment-star-item" v-for="n in 5 - comment.rating" :key="n">
                <i class="bi bi-star-fill review-star-icon icon-not-active"></i>
              </li>
            </ul>
            <div class="comment-content">
              <p>{{ comment.review_text }}</p>
            </div>
          </div>
        </div>
        <!-- btn show more -->
        <div v-if="review.comments.length > 5" class="view-all-tab">
          <button class="view-all-tab__btn">
            <i class="bi bi-plus-circle view-all-tab__btn--icon"></i>
            Xem thêm
          </button>
        </div>
      </div>
    </div>
    <!-- modal review -->
    <div
      class="box-modal"
      v-show="showModalReviewBg"
      @click="(showModalReview = false), (showModalReviewBg = false)"
    >
      <div class="modal-container" v-show="showModalReview" @click.stop="">
        <div class="modal-header">
          <p>Đánh giá & nhận xét</p>
          <button
            class="btn-close btn-close-modal"
            @click="(showModalReview = false), (showModalReviewBg = false)"
          ></button>
        </div>
        <div class="modal-body">
          <p class="title">{{ productName }}</p>
          <p class="title-review-star">Đánh giá chung</p>
          <div>
            <v-rating v-model="rating" class="review-star">
              <template v-slot:item="props">
                <v-icon
                  class="review-star__icon"
                  :color="props.isFilled ? '#ffbf00' : '#919eab85'"
                  size="large"
                  @click="props.onClick"
                >
                  {{ props.isFilled ? "bi bi-star-fill" : "bi bi-star-fill" }}
                </v-icon>
              </template>
            </v-rating>
          </div>
          <div class="textarea-comment">
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                v-model.trim.lazy="commentReview"
              ></textarea>
              <label for="floatingTextarea2"
                >Xin mời chia sẻ một số cảm nhận về sản phẩm</label
              >
            </div>
          </div>
          <div>
            <div v-show="imageReviewShow.length < 3">
              <input
                id="review-image"
                type="file"
                multiple="multiple"
                accept="image/*"
                class="d-none"
                @change="changeReviewImage"
              />
              <label for="review-image" class="btn-add_file">
                <span class="icon">
                  <i class="bi bi-images"></i>
                </span>
                Thêm hình ảnh
              </label>
            </div>
            <div class="review-image_list">
              <div
                v-for="(image, index) in imageReviewShow"
                :key="index"
                class="review-image_item"
                @click="removeImageReviewShow(index)"
              >
                <img :src="image" />
                <button class="review-image-close">x</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-bottom">
          <button
            @click="addReview"
            class="modal-bottom__btn-submit"
            :class="{ disabled: loadingAddReview }"
          >
            <v-progress-circular
              v-if="loadingAddReview"
              :size="25"
              color="white"
              indeterminate
            ></v-progress-circular>
            <span>Gửi đánh giá</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
