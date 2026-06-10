
import { supabase } from '../config/supabase';

export const homeService = {
  // ดึงข้อมูลหน้า Home
  async getHomeData() {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  },

  // อัปเดตข้อมูลหน้า Home
  async updateHomeData(id: number, content: any) {
    const { data, error } = await supabase
      .from('home_content')
      .update(content)
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }
};
