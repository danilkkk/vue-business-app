<template>
 <app-page back :title="'Q&A'">
   <question-item
   v-for="q in questions"
   :key="q.title"
    :question="q">
   </question-item>
 </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage.vue";
import QuestionItem from "../components/questions/QuestionItem.vue";
export default {
  components: {AppPage, QuestionItem},
  setup() {
    const questions = [
      {title: 'Для чего всё это?', text: 'Для демонстрации'}
    ]

    return {
      questions
    }
  }

}
</script>
