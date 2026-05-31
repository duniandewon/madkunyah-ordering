import { onUnmounted, type Ref, ref } from "vue";

export const useScrollspy = (
  containerRef: Ref<HTMLElement | null>,
  selector = "[data-category]",
) => {
  const activeCategory = ref<string>();
  const observer = ref<IntersectionObserver | null>(null);

  const stopWatching = () => {
    if (observer.value) {
      observer.value.disconnect();
      observer.value = null;
    }
  };

  const startWatching = () => {
    stopWatching();

    const options: IntersectionObserverInit = {
      root: containerRef.value,
      threshold: [0, 0.2, 0.5, 0.8],
      rootMargin: "-10% 0px -70% 0px",
    };

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.boundingClientRect.top <=
            (containerRef.value?.getBoundingClientRect().top || 0) + 100
        ) {
          activeCategory.value = entry.target.id;
        }
      });
    }, options);

    document.querySelectorAll(selector).forEach((el) => {
      observer.value?.observe(el);
    });
  };

  const setActiveManual = (id: string) => {
    activeCategory.value = id;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  onUnmounted(() => stopWatching());

  return {
    activeCategory,
    startWatching,
    stopWatching,
    setActiveManual,
  };
};
