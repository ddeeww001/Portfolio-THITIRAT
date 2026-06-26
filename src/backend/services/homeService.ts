import { supabase } from '../config/supabase';

export const homeService = {
  async getHomeData() {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  async updateHomeData(id: number, content: any) {
    const { data, error } = await supabase
      .from('home_content')
      .update(content)
      .eq('id', id);
    if (error) throw error;
    return data;
  }
};
