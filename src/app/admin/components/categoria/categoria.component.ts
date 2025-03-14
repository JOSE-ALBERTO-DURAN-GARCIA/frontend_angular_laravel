import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
   
  categorias: any[] = []

  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    detalle: new FormControl(''),

 });

 categoria_id: number;  // creamos y estamos guardando en un avariable

  visible: boolean = false;

  constructor(private categoriaService: CategoriaService){
    this.listarCategorias()

  }

  listarCategorias(){
   this.categoriaService.listar().subscribe(
     (res: any) => {
       this.categorias = res
     },
    (error:any) => {
      console.log(error)
    }
   )
  }

  guardarCategoria(){
    if(this.categoria_id){

      const datos = {
        nombre:this.categoriaForm.value.nombre, 
        detalle: this.categoriaForm.value.detalle
      }

        this.categoriaService.modificar(this.categoria_id, datos).subscribe( //guardaremos la nueva categoria
        (res) => {
          this.listarCategorias() //carga las lista de categoria 
          this.visible = false
          this.categoriaForm.reset();  //limpia el formulario
          this.categoria_id = null
        },
         (error:any) => {    // si hay un error en la lista nos mostrar
           console.log(error)
          }
    )
    }else{
      const datos = {
        nombre:this.categoriaForm.value.nombre, 
        detalle: this.categoriaForm.value.detalle
      }
      this.categoriaService.guardar(datos).subscribe( //guardaremos la nueva categoria
      (res) => {
        this.listarCategorias() //carga las lista de categoria actualiza
        this.visible = false
        this.categoriaForm.reset();
      },
      (error:any) => {    // si hay un error en la lista nos mostrar
        console.log(error)
      }
    )
    }

  }

  showDialog() {
      this.visible = true;
  }

    editCategoria(cat){
       this.categoria_id = cat.id;

       this.categoriaForm = new FormGroup({
        nombre: new FormControl(cat.nombre, [Validators.required]),
        detalle: new FormControl(cat.detalle)
      });

       this.showDialog()
    }
    deleteCategoria(cat){
       if(confirm("Esta seguro de eliminar categoria")){
          this.categoriaService.eliminar(cat.id).subscribe( //guardaremos la nueva categoria
            (res) => {
               this.listarCategorias() //carga las lista de categoria actualiza
             
            },
          (error:any) => {    // si hay un error en la lista nos mostrar
          console.log(error)
        }
      )
       }
    }

}
