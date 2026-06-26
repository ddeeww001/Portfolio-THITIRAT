import { supabase } from '../config/supabase';

export const profileService = {
  async getProfileData() {
    const { data, error } = await supabase
      .from('profile_content')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfileData(id: number, content: any) {
    const { data, error } = await supabase
      .from('profile_content')
      .update(content)
      .eq('id', id);
    if (error) throw error;
    return data;
  }
};
