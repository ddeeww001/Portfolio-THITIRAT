
import { supabase } from '../config/supabase';

export const profileService = {
  // ดึงข้อมูลหน้า Profile
  async getProfileData() {
    const { data, error } = await supabase
      .from('profile_content')
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  },

  // อัปเดตข้อมูลหน้า Profile
  async updateProfileData(id: number, content: any) {
    const { data, error } = await supabase
      .from('profile_content')
      .update(content)
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }
};
