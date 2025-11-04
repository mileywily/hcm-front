import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, TrabajadorService, UserRolesService, LdapService } from '../../services/index';
import { Trabajador, Respuesta, RolModelo } from '../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  user: Trabajador;

  loginForm: FormGroup;
  isSubmitted = false;

  roles: RolModelo[] = [];
  perfiles: any[] = [];

  constructor(
    private router: Router,
    private ldapService: LdapService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private employeeService: TrabajadorService,
    private srvRolesByUser: UserRolesService
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.srvRolesByUser.deleteRolesLocalStorage();
    this.srvRolesByUser.deletePerfilesLocalStorage();
    this.createForm();
  }

  createForm() {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }); 
  }

  get formControls() { return this.loginForm.controls; }

  login() {

    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    this.ldapService.login(this.model)
      .toPromise()
      .then(results => {

        let aux: Respuesta = results;

        if (aux.result) {

          //this.getCiBySir(this.model.username);

          this.getRolIdUserBySir();
        } else {
          this.error = aux.message;
          return;
        }

      })
      .catch(err => { console.log(err); });
  }

  getRolIdUserBySir() {

    this.srvRolesByUser.getIdUserBySir(this.model.username)
      .toPromise()
      .then(results => {

        if (results) {
          this.findRolByUser(results.idUsuario);
          this.findPerfilByUser(results.idUsuario);
        }
        else{
          this.error = "No tiene acceso al sistema";
        }
      })
      .catch(err => { console.log(err) });

  }

  findRolByUser(idUser: any) {

    this.srvRolesByUser.getRoles(idUser)
      .toPromise()
      .then(roles => {
        this.roles = roles;
        this.srvRolesByUser.setRolesLocalStorage(this.roles);
        this.getCiBySir(this.model.username);
      })
      .catch(err => { console.log(err); });
  }

  findPerfilByUser(idUser: any) {

    this.srvRolesByUser.getPerfiles(idUser)
      .toPromise()
      .then(perfiles => {
        this.perfiles = perfiles;
        this.srvRolesByUser.setPerfilesLocalStorage(this.perfiles);

        this.getCiBySir(this.model.username);

        console.log('this.perfiles', this.perfiles);
      })
      .catch(err => { console.log(err); });
  }

  getCiBySir(sir: any) {

    this.employeeService.getCiBySir({ "siglado": sir })
      .toPromise()
      .then(results => {

        let aux: Trabajador = results.pop();
        this.getData(aux);
      })
      .catch(err => { console.log(err) });

  }

  getData(data: Trabajador) {

    this.employeeService.getData(data)
      .toPromise()
      .then(results => {

        let aux: Trabajador = results.pop();
        data.centro_costo = aux.centro_costo;
        data.siglado = aux.siglado;
        data.descripcion = aux.descripcion;;
        data.sistema_horario = aux.sistema_horario;

        this.authService.login(data);
        //this.router.navigate(['solicitud-beneficiario/-1/-1']);
        this.router.navigate(['menu-principal']);

      })
      .catch(err => { console.log(err) });
  }
}
