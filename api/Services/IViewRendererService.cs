namespace api.Services
{
    public interface IViewRendererService
    {
        Task<string> RenderAsync<TModel>(string viewPath, TModel model);
    }
}
