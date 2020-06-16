import { shallowMount } from '@vue/test-utils';
import Checkbox from '@/components/Checkbox.vue';

describe('Checkbox.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: { checked: false, name: 'test' },
    });
    expect(wrapper.text()).toMatch('test');
  });
});
