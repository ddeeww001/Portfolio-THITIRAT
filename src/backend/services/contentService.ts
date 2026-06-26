import { supabase } from '../config/supabase';

export const contentService = {
  async getContent(tableName: string) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    if (error) throw error;
    return data;
  },

  async updateContent(tableName: string, id: string | number, content: any) {
    const { data, error } = await supabase
      .from(tableName)
      .update(content)
      .eq('id', id);
    if (error) throw error;
    return data;
  },

  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addProject(project: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project]);
    if (error) throw error;
    return data;
  },

  async deleteProject(id: number) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
