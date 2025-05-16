# RBAC_TESTE_APLICJAVA
 uma interface gráfica (GUI) completa para o sistema RBAC em Java usando JavaFX. Esta interface permitirá gerenciar usuários, papéis e permissões de forma visual.

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/RbacApplication.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/controller/LoginController.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/controller/DashboardController.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/controller/UserController.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/controller/RoleController.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/controller/PermissionController.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/util/AlertUtil.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/gui/util/SessionManager.java"
...
```

Agora vamos adicionar os arquivos FXML para as interfaces:

```xml project="java-rbac-system" file="src/main/resources/fxml/login.fxml"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/dashboard.fxml"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/users.fxml"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/roles.fxml"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/permissions.fxml"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/welcome.fxml"
...
```

```css project="java-rbac-system" file="src/main/resources/styles/styles.css"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/reports.fxml"
...
```

```xml project="java-rbac-system" file="src/main/resources/fxml/settings.fxml"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/config/JavaFxApplication.java"
...
```

```java project="java-rbac-system" file="src/main/java/com/rbac/system/RbacApplicationLauncher.java"
...
```

## Explicação da Interface Gráfica (GUI) do Sistema RBAC em Java

A interface gráfica que adicionei ao sistema RBAC em Java foi desenvolvida usando JavaFX, que é uma plataforma moderna para criação de aplicações desktop ricas em recursos visuais. Esta GUI permite gerenciar todos os aspectos do sistema de controle de acesso de forma intuitiva.

### Principais Características da Interface:

1. **Tela de Login**

1. Interface para autenticação de usuários
2. Validação de credenciais
3. Acesso ao sistema baseado no papel do usuário



2. **Painel Principal (Dashboard)**

1. Menu lateral com acesso às funcionalidades
2. Exibição do nome do usuário e seu papel
3. Navegação intuitiva entre as diferentes seções



3. **Gerenciamento de Usuários**

1. Listagem de todos os usuários
2. Formulário para adicionar novos usuários
3. Atribuição de papéis durante o cadastro
4. Edição e exclusão de usuários existentes



4. **Gerenciamento de Papéis**

1. Visualização de todos os papéis disponíveis
2. Criação de novos papéis
3. Atribuição de permissões aos papéis
4. Edição e exclusão de papéis



5. **Gerenciamento de Permissões**

1. Listagem de todas as permissões
2. Criação de novas permissões
3. Edição e exclusão de permissões existentes



6. **Relatórios**

1. Interface para geração de relatórios
2. Filtros por data e tipo
3. Exportação em diferentes formatos



7. **Configurações do Sistema**

1. Opções gerais de configuração
2. Configurações de segurança
3. Configurações de auditoria





### Aspectos Técnicos:

- **Arquitetura MVC**: Separação clara entre modelo, visualização e controlador
- **Integração com Spring Boot**: A GUI se integra perfeitamente com o backend Spring
- **Controle de Acesso**: A interface adapta-se dinamicamente às permissões do usuário
- **Design Responsivo**: Layout bem estruturado e adaptável
- **Validação de Dados**: Verificação de campos obrigatórios e formatos


### Como Executar:

Para iniciar a aplicação com a interface gráfica, execute a classe `RbacApplicationLauncher`. Isso iniciará tanto o servidor Spring Boot quanto a interface JavaFX.

Os usuários pré-configurados para teste são:

- **admin/admin123**: Acesso completo ao sistema
- **manager/manager123**: Acesso de gerente
- **supervisor/supervisor123**: Acesso de supervisor
- **user/user123**: Acesso básico


Esta interface gráfica completa o sistema RBAC, proporcionando uma forma visual e intuitiva de gerenciar usuários e suas permissões.
