import { Renderer, createRenderer } from './renderer/renderer';

const canvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;
const select = document.getElementById('model-select') as HTMLSelectElement;
let renderer: Renderer;
select.onchange = () => renderer.load(select.value);
fetch(
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/model-index.json'
)
  .then((response) => response.json())
  .then((modelIndex) => {
    modelIndex.forEach(async (model: any) => {
      const option = document.createElement('option');
      option.innerHTML = model.name;
      option.value = `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/${model.name}/glTF/${model.name}.gltf`;
      select.add(option);
      if (model.name === 'DamagedHelmet') {
        select.value = option.value;
        renderer = await createRenderer(canvas);
        renderer.load(select.value);
      }
    });
  });
