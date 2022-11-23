# Ciudadanos

El sistema estará regido por dos tipos de identidades principales: El Super Administrador, (quien es la persona que administra la plataforma a nivel instalación, configuracion y soporte) y los Ciudadanos, quienes podrán tener roles con funcionalidades definidas a continuación.

## Perfiles de los ciudadanos dentro de la plataforma.

Un ciudadano puede tener múltiples Roles dentro de la plataforma como:

- ## Ciudadanía en General

  - ### Sin registro

    - Puede ver información limitada de la plataforma
    - Puede registrarse para poder interactuar con la plataforma.
    - Puede ver _Reportes Ciudadanos_

  - ### Con registro
    - Debe aceptar la política de notificaciones de la plataforma.
    - Puede y generar y comentar _Reportes Ciudadanos_
    - Invitar a nuevos ciudadanos a usar la app por medio de enlace a sitio web, donde redireccione a la plataforma de ios o android según corresponda.
    - Recibe notificaciones generadas en la paraforma, referentes a:
      - Calles a las que pertenezca
      - Colonias a las que pertenezca
      - Las regidurias del municipio.

- ## Gerente de Calle

  - Debe ser un ciudadano registrado y validado su registro por whatsapp y email ya que recibirá notificaciones (configurables).
  - Debe aceptar la política de notificaciones del gerente de Calle.
  - Debe haber solicitado la fundación de una Calle y haber sido autorizada por un _Administrador Municipal_
  - Como fundador de una Calle, se convierte en su primer administrador.
  - Puede invitar a otros ciudadanos a que pertenezca a las Calles que administra.
    - Por medio de el _QR de Calle_
    - Por medio de un enlace ("Compartir Calle")
  - Puede autorizar solicitudes de administrador en las Calles que administra.

- ## Gerente de Colonia

  - Debe ser un ciudadano registrado y validado su registro por whatsapp y email ya que recibirá notificaciones (configurables).
  - Debe aceptar la política de notificaciones del gerente de Colonia.
  - Debe haber solicitado la fundación de una Colonia y haber sido autorizada por un _Administrador Municipal_
  - Como fundador de una Colonia, se convierte en su primer administrador.
  - Puede invitar a otros ciudadanos a que pertenezca a las Colonias que administra.
    - Por medio de el _QR de Colonia_
    - Por medio de un enlace ("Compartir Colonia") por whatsapp (interno del sistema)
  - Puede autorizar solicitudes de administrador en las Colonias que administra.

- ## Regidor

  - Debe ser un ciudadano registrado y validado su registro por whatsapp y email ya que recibirá notificaciones (configurables).
  - Debe aceptar la política de notificaciones del gerente de Regidor.
  - Podrá ser regidor de una de las regidurías del municipio:
    - Por medio de el _QR de Regiduría_ el cual solo lo puede compartir en su pantalla el "Administrador Municipal".
    - Por medio de un enlace ("Compartir Administración de Regiduría") que solo puede compartir el "Administrador Municipal" por whatsapp (interno del sistema).
  - No puede administraro mas de una Regiduría del Municipio.

  - Puede ver e interactuar con los reportes relacionados de la Regiduría que administra.
    - Revisarlos
    - Autorizarlos e Invalidaros (falsos, duplicados, etc)
    - Comentarlos como autorizad municipal.
    - Resolverlos o cancelarlos.
    - Puede emitir Comunicados desde su Regiduría.

- ## Moderador

  - Debe ser un ciudadano registrado y validado su registro por whatsapp y email ya que recibirá notificaciones (configurables).
  - Debe aceptar la política de notificaciones del Moderador.
  - Puede moderar los Comentarios en los Comunicados de las regidurías que tenga asignadas.
  - Es designado por Administrador Municipal.
  - El Administrador Municipal es quien le asigna regidurías a moderar.
  - Puede moderar los Comentarios en de Reportes Ciudadanos de las regidurías asignadas.
  - Puede moderar varias Regidurías.
  - Modera los Reportes Ciudadanos.
    - Puede activar/desactivar comunicados para que sean o no vistos.
    - Puede banear Comentarios hechos por Ciudadanos en los Comunicados de su regiduría.
    - Puede solicitar banear a un Ciudadano por alguna actividad reportable, como un Comentario o Reporte Ciudadano falso.
    - Como Moderador, puede comentar Reportes Ciudadanos y Comunicados de sus regidurías asignadas.
    - Interactuar con el bot de whatsapp para responder, banear y autorizar comentarios.

- ## Administrador Municipal

  - Puede autorizar fundaciones de calles y colonias.
  - Puede autorizar solicitudes de administrar calle y colonia.
  - Puede compartir accesos para ser Moderador con ciudadanos Validados.
  - Puede administrar las regidurias (Crear y Actualizar)
  - Puede Activar/Desactivar regidurías para que sean o nó visibles en la plataforma por los demás ciudadanos y perfiles.
  - Puede compartir accesos para Administrar regidurias activas.
  - Puede revisar y autorizar las solicitudes de baneo de ciudadanos.
  - Puede banear y desbanear a ciudadanos.
  - Administra el Catálogo de Colonias del Municipio.

## Formas de registro para los ciudadanos.

- Con verificación de correo electrónico
- Facebook
- Twitter
- Google
- Apple
- Instagram

## Validaciones de cuenta para los Ciudadanos

Las validaciones de cuenta serán opcionales, sin embargo brindarán la posibilidad de contar con funcionalidades adicionales dentro de la plataformam como: gerente de calle o colónia y regidor municipal.

### Qué se valida?

Número de teléfono por medio de whatsapp y su correo electrónico.

### Cómo?

- Número de teléfono
  - Mediante código enviado por Whatsapp.
- Correo electrónico
  -Mediante código enviado.

### Para qué?

- Notificaciones, poder recibirlas por whatsapp una vez siendo un Ciudadano de la aplicación.
- Interacción con el Bot de la plataforma.
  - Si, la plataforma contará con un bot de whatsapp para distintas funciones
  - Como el público ciudadano podrá consultar al bot del municipio para ver los últimos comunicados por ejemplo.
  - Si el ciudadano tiene otro perfil como Moderador, podrá recibir notificaciones de temas de moderación y desde el bot efectuar acciones como el baneo de comentarios, autorización de reportes, etc.
- Seguridad en la asignación de funciones de Regiduría y Administración.

### Una vez que un Ciudadano ha validado su whatsapp y email puede:

- Solicitar ser Fundador de una Calle.
- Solicitar ser Administrador una Calle fundada y autorizada.
- Solicitar ser Administrador de una colonia de su municipio.
- Puede seleccionar de un listádo de Colonias del municipio.
- Solicitar ser Regidor de alguna de las regidurías del municipio.
- Solicitar unirse a una calle por medio de escanear un _QR de Calle_ o un "Enlace Compartido".
- Solicitar unirse a una colonia por medio de escanear un _QR de Colonia_ o un "Enlace Compartido"
- Puede ser designado como administrador de Calle, Colonia o Regiduria Municipal.
